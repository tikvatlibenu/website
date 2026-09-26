import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_services_tone" AS ENUM('teal', 'pink', 'yellow', 'navy');
  CREATE TYPE "public"."enum_home_page_services_icon" AS ENUM('stethoscope', 'heart-handshake', 'users', 'sun', 'heart', 'gift');
  CREATE TABLE "home_page_hero_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_home_page_services_tone" NOT NULL,
  	"icon" "enum_home_page_services_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "home_page_transparency_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_url" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"cover_id" integer
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"about_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_title_highlight" varchar,
  	"hero_description" varchar,
  	"hero_primary_label" varchar,
  	"hero_secondary_label" varchar,
  	"services_eyebrow" varchar,
  	"services_title" varchar,
  	"services_description" varchar,
  	"transparency_eyebrow" varchar,
  	"transparency_title" varchar,
  	"transparency_description" varchar,
  	"about_eyebrow" varchar,
  	"about_title" varchar,
  	"about_body" varchar,
  	"about_link_label" varchar,
  	"stories_eyebrow" varchar,
  	"stories_title" varchar,
  	"stories_description" varchar,
  	"campaigns_eyebrow" varchar,
  	"campaigns_title" varchar,
  	"campaigns_description" varchar,
  	"cta_title" varchar,
  	"cta_description" varchar,
  	"cta_primary_label" varchar,
  	"cta_secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "home_page_hero_highlights" ADD CONSTRAINT "home_page_hero_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_services" ADD CONSTRAINT "home_page_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_transparency_items" ADD CONSTRAINT "home_page_transparency_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_stories" ADD CONSTRAINT "home_page_stories_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_stories" ADD CONSTRAINT "home_page_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_hero_highlights_order_idx" ON "home_page_hero_highlights" USING btree ("_order");
  CREATE INDEX "home_page_hero_highlights_parent_id_idx" ON "home_page_hero_highlights" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_highlights_locale_idx" ON "home_page_hero_highlights" USING btree ("_locale");
  CREATE INDEX "home_page_services_order_idx" ON "home_page_services" USING btree ("_order");
  CREATE INDEX "home_page_services_parent_id_idx" ON "home_page_services" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_locale_idx" ON "home_page_services" USING btree ("_locale");
  CREATE INDEX "home_page_transparency_items_order_idx" ON "home_page_transparency_items" USING btree ("_order");
  CREATE INDEX "home_page_transparency_items_parent_id_idx" ON "home_page_transparency_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_transparency_items_locale_idx" ON "home_page_transparency_items" USING btree ("_locale");
  CREATE INDEX "home_page_stories_order_idx" ON "home_page_stories" USING btree ("_order");
  CREATE INDEX "home_page_stories_parent_id_idx" ON "home_page_stories" USING btree ("_parent_id");
  CREATE INDEX "home_page_stories_locale_idx" ON "home_page_stories" USING btree ("_locale");
  CREATE INDEX "home_page_stories_cover_idx" ON "home_page_stories" USING btree ("cover_id");
  CREATE INDEX "home_page_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_about_image_idx" ON "home_page" USING btree ("about_image_id");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_hero_highlights" CASCADE;
  DROP TABLE "home_page_services" CASCADE;
  DROP TABLE "home_page_transparency_items" CASCADE;
  DROP TABLE "home_page_stories" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TYPE "public"."enum_home_page_services_tone";
  DROP TYPE "public"."enum_home_page_services_icon";`)
}
