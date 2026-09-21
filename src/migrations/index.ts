import * as migration_20260907_163940_initial from './20260907_163940_initial';
import * as migration_20260921_120000_enable_rls from './20260921_120000_enable_rls';

export const migrations = [
  {
    up: migration_20260907_163940_initial.up,
    down: migration_20260907_163940_initial.down,
    name: '20260907_163940_initial'
  },
  {
    up: migration_20260921_120000_enable_rls.up,
    down: migration_20260921_120000_enable_rls.down,
    name: '20260921_120000_enable_rls'
  },
];
