import * as migration_20260907_163940_initial from './20260907_163940_initial';

export const migrations = [
  {
    up: migration_20260907_163940_initial.up,
    down: migration_20260907_163940_initial.down,
    name: '20260907_163940_initial'
  },
];
