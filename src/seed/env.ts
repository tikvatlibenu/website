import { config as loadEnv } from 'dotenv'

/**
 * The seed script runs standalone under tsx, so nothing has loaded the env
 * files for it. (Next and the Payload CLI both use @next/env, which already
 * handles .env.local — this is only for scripts outside those two.)
 *
 * Import this for its side effect as the FIRST import in an entrypoint, so the
 * variables exist before payload.config is evaluated.
 */
loadEnv({ path: ['.env.local', '.env'], quiet: true })
