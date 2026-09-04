import { Link } from 'react-router-dom';
import { PageContainer } from './PageContainer';

const QUICK_LINKS = [
  { label: 'Kflat', to: '/subgroups' },
  { label: 'Lebawie', to: '/subgroups/lebawie' },
  { label: 'Meklit', to: '/subgroups/meklit' },
  { label: 'About Us', to: '/about' },
] as const;

const MEDIA_LINKS = [
  { label: 'Merhgibrat', to: '/magazine' },
  { label: 'Gallary', to: '/gallery' },
  { label: 'Videos', to: '/media' },
  { label: 'Trips', to: '/events' },
  { label: 'Tutors', to: '/courses' },
] as const;

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <PageContainer className="grid grid-cols-1 gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="h-10 w-10 rounded-full bg-white/10" aria-hidden="true" />
          </div>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <p>AASTU, Addis Ababa, Ethiopia</p>
            <p>+251-974-15-0725</p>
            <p>companyemail@example.com</p>
          </div>
        </div>

        <FooterColumn title="Quick Links" links={QUICK_LINKS} />
        <FooterColumn title="Media" links={MEDIA_LINKS} />
      </PageContainer>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} AASTU Gibigubae. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; to: string }>;
}) {
  return (
    <div>
      <h3 className="font-heading text-sm text-white">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm text-white/70 transition-colors hover:text-accent">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
