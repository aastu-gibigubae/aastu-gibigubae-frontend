import { Link } from 'react-router-dom';
import { Card, ImagePlaceholder, buttonStyles } from '@components/ui';
import { photoFromPool } from '@/assets/images';
import type { Subgroup } from '../types';

export function SubgroupCard({ subgroup }: { subgroup: Subgroup }) {
  return (
    <Card media={<ImagePlaceholder aspect="aspect-[4/3]" src={subgroup.image_urls[0] ?? photoFromPool(Number(subgroup.id) || 0)} alt={subgroup.name} />}>
      <h3 className="font-heading text-lg text-primary-dark">{subgroup.name}</h3>
      {subgroup.description && <p className="mt-2 text-sm text-primary-dark/60">{subgroup.description}</p>}
      {subgroup.sub_kiflat.length > 0 && (
        <ul className="mt-4 space-y-2">
          {subgroup.sub_kiflat.map((sub) => (
            <li key={sub.id} className="flex items-center gap-2 text-sm text-primary-dark/80">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent text-primary-dark">
                <CheckIcon className="h-3 w-3" />
              </span>
              {sub.name}
            </li>
          ))}
        </ul>
      )}
      <Link to={`/subgroups/${subgroup.id}`} className={buttonStyles({ variant: 'outline', size: 'sm', className: 'mt-5' })}>
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
