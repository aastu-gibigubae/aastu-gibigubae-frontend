import { Link } from 'react-router-dom';
import { Card, ImagePlaceholder, buttonStyles } from '@components/ui';
import type { Subgroup } from '../types';

export function SubgroupCard({ subgroup }: { subgroup: Subgroup }) {
  return (
    <Card media={<ImagePlaceholder aspect="aspect-[4/3]" />}>
      <h3 className="font-heading text-lg text-primary-dark">{subgroup.name}</h3>
      <p className="mt-2 text-sm text-primary-dark/60">{subgroup.description}</p>
      <ul className="mt-4 space-y-2">
        {subgroup.subSubgroups.map((name, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-primary-dark/80">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent text-primary-dark">
              <CheckIcon className="h-3 w-3" />
            </span>
            {name}
          </li>
        ))}
      </ul>
      <Link to={`/subgroups/${subgroup.slug}`} className={buttonStyles({ variant: 'outline', size: 'sm', className: 'mt-5' })}>
        Learn more
      </Link>
    </Card>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
