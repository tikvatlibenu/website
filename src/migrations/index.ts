import * as migration_20260907_163940_initial from './20260907_163940_initial';
import * as migration_20260921_120000_enable_rls from './20260921_120000_enable_rls';
import * as migration_20260921_152648_media_storage_prefix from './20260921_152648_media_storage_prefix';
import * as migration_20260926_114850_home_page from './20260926_114850_home_page';
import * as migration_20260926_115541_site_registration_number from './20260926_115541_site_registration_number';

export const migrations = [
  {
    up: migration_20260907_163940_initial.up,
    down: migration_20260907_163940_initial.down,
    name: '20260907_163940_initial',
  },
  {
    up: migration_20260921_120000_enable_rls.up,
    down: migration_20260921_120000_enable_rls.down,
    name: '20260921_120000_enable_rls',
  },
  {
    up: migration_20260921_152648_media_storage_prefix.up,
    down: migration_20260921_152648_media_storage_prefix.down,
    name: '20260921_152648_media_storage_prefix',
  },
  {
    up: migration_20260926_114850_home_page.up,
    down: migration_20260926_114850_home_page.down,
    name: '20260926_114850_home_page',
  },
  {
    up: migration_20260926_115541_site_registration_number.up,
    down: migration_20260926_115541_site_registration_number.down,
    name: '20260926_115541_site_registration_number'
  },
];
