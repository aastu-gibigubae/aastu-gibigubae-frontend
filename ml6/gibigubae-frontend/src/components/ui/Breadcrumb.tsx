import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** Last item renders as bold plain text (current page); earlier items are links. */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="font-body text-sm text-primary-dark/60">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">›</span>}
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-primary-dark">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-medium text-primary-dark' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
