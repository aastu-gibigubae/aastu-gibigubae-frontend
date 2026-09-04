import type { Subgroup } from './types';

/** TEMPORARY placeholder dataset — see api.ts for how this gets replaced. */
export const MOCK_SUBGROUPS: Subgroup[] = [
  {
    id: '1',
    slug: 'kflat',
    name: 'Kflat',
    description: 'This subgroup is about this, this and that, this subgroup is about this, this and that.',
    subSubgroups: ['Sub-sub group', 'Sub-sub group', 'Sub-sub group'],
  },
  {
    id: '2',
    slug: 'lebawie',
    name: 'Lebawie',
    description: 'This subgroup is about this, this and that, this subgroup is about this, this and that.',
    subSubgroups: ['Sub-sub group', 'Sub-sub group'],
  },
  {
    id: '3',
    slug: 'meklit',
    name: 'Meklit',
    description: 'This subgroup is about this, this and that, this subgroup is about this, this and that.',
    subSubgroups: ['Sub-sub group', 'Sub-sub group', 'Sub-sub group'],
  },
];
