import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Close the Supabase Data API over every table.
 *
 * Supabase auto-exposes the public schema over REST (PostgREST) to the `anon`
 * and `authenticated` roles, reachable with the publishable key — which is
 * public by design. With RLS off, that key could read `users` (password
 * hashes), `users_sessions` and `contact_submissions` (visitor PII), and write
 * to any table.
 *
 * Nothing in this app uses the Data API: all access goes through Payload,
 * which connects as the table owner, and RLS does not apply to owners. So every
 * table gets RLS enabled with no policies, which denies all rows to
 * anon/authenticated and leaves Payload untouched. Do NOT use FORCE ROW LEVEL
 * SECURITY here: it would apply RLS to the owner too and lock Payload out.
 *
 * If a feature ever needs the Data API, add a narrow policy for that table in
 * its own migration rather than disabling RLS.
 *
 * Payload keeps creating tables in later migrations, so an event trigger
 * enables RLS on each new table in `public` automatically.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE t record;
    BEGIN
      FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t.tablename);
      END LOOP;
    END $$;
  `)

  await db.execute(sql`
    CREATE OR REPLACE FUNCTION public.rls_auto_enable()
    RETURNS event_trigger
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = pg_catalog
    AS $$
    DECLARE cmd record;
    BEGIN
      FOR cmd IN
        SELECT * FROM pg_event_trigger_ddl_commands()
        WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
          AND object_type = 'table'
          AND schema_name = 'public'
      LOOP
        EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', cmd.object_identity);
      END LOOP;
    END $$;

    REVOKE ALL ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
  `)

  // Creating event triggers needs elevated rights. Supabase grants them to the
  // postgres role, but if a platform refuses, keep the migration usable and
  // leave a loud warning instead of failing the deploy: existing tables are
  // already protected by the loop above.
  await db.execute(sql`
    DO $$
    BEGIN
      DROP EVENT TRIGGER IF EXISTS rls_auto_enable;
      CREATE EVENT TRIGGER rls_auto_enable
        ON ddl_command_end
        WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
        EXECUTE FUNCTION public.rls_auto_enable();
    EXCEPTION WHEN insufficient_privilege THEN
      RAISE WARNING 'Could not create event trigger rls_auto_enable: new tables will NOT get RLS automatically. Enable it in each future migration.';
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP EVENT TRIGGER IF EXISTS rls_auto_enable;
    DROP FUNCTION IF EXISTS public.rls_auto_enable();

    DO $$
    DECLARE t record;
    BEGIN
      FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
        EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', t.tablename);
      END LOOP;
    END $$;
  `)
}
