import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { PageContainer } from './PageContainer';
import { ImagePlaceholder } from '@components/ui';
import { useAuth } from '@hooks/useAuth';
import { images } from '@/assets/images';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: 'Courses', to: '/courses' },
  { label: 'Subgroups', to: '/subgroups' },
  { label: 'Magazine', to: '/magazine' },
  { label: 'Contact', to: '/contact' },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-primary-dark text-white">
      <PageContainer className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg" onClick={() => setIsOpen(false)}>
          <img src={images.orgSealLogo} alt="AASTU Gibigubae" className="h-9 w-9 rounded-full object-cover" />
          <span className="sr-only">AASTU Gibigubae</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  'text-sm font-body transition-colors hover:text-accent',
                  isActive ? 'text-accent' : 'text-white',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          {isAuthenticated ? <AuthedNavSlot /> : <LoginLink />}
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
        </button>
      </PageContainer>

      {isOpen && (
        <nav className="md:hidden border-t border-white/10">
          <PageContainer className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'rounded px-2 py-2 text-sm font-body',
                    isActive ? 'text-accent' : 'text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2" onClick={() => setIsOpen(false)}>
              {isAuthenticated ? <AuthedNavSlot /> : <LoginLink />}
            </div>
          </PageContainer>
        </nav>
      )}
    </header>
  );
}

function LoginLink() {
  return (
    <Link
      to="/login"
      className="inline-flex w-fit items-center rounded-full border border-accent px-5 py-1.5 text-sm font-body text-accent transition-colors hover:bg-accent hover:text-primary-dark"
    >
      Login
    </Link>
  );
}

/** Bell (announcements) + avatar (profile) — replaces the Login CTA once a session exists. */
function AuthedNavSlot() {
  return (
    <div className="flex items-center gap-4">
      <Link to="/announcements" aria-label="Announcements" className="text-white/90 hover:text-accent">
        <BellIcon className="h-5 w-5" />
      </Link>
      <Link to="/profile" aria-label="My profile">
        <ImagePlaceholder round tone="dark" className="h-9 w-9" />
      </Link>
    </div>
  );
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5v2.3c0 .5-.15 1-.44 1.4L4 12.5h12l-1.06-1.8a2.5 2.5 0 0 1-.44-1.4V7A4.5 4.5 0 0 0 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 15.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
