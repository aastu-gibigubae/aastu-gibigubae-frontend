import type { MagazineIssue } from './types';

/** TEMPORARY placeholder dataset — see api.ts for how this gets replaced. */
export const MOCK_ISSUES: MagazineIssue[] = [
  {
    id: '1',
    title: 'THE TITLE OF THE MAGAZINE',
    coverLabel: 'Latest Issue: May 2026',
    releasedLabel: 'Released: June 24, 2019',
    description:
      'A little description about the magazine and its topic, what it includes and so on and so on. A little description about the magazine.',
    isFeatured: true,
  },
  { id: '2', title: 'THE TITLE OF THE MAGAZINE', coverLabel: 'July 2016', releasedLabel: 'Released: July 2016', description: 'The second Issue #10', isFeatured: false },
  { id: '3', title: 'THE TITLE OF THE MAGAZINE', coverLabel: 'July 2016', releasedLabel: 'Released: July 2016', description: 'The second Issue #10', isFeatured: false },
  { id: '4', title: 'THE TITLE OF THE MAGAZINE', coverLabel: 'July 2016', releasedLabel: 'Released: July 2016', description: 'The second Issue #10', isFeatured: false },
  { id: '5', title: 'THE TITLE OF THE MAGAZINE', coverLabel: 'July 2016', releasedLabel: 'Released: July 2016', description: 'The second Issue #10', isFeatured: false },
];
