import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { PageContainer } from './PageContainer';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: 'Courses', to: '/courses' },
  { label: 'Subgroups', to: '/subgroups' },
  { label: 'Magazine', to: '/magazine' },
  { label: 'Contact', to: '/contact' },
] as const;

/**
 * Static shell only — auth-aware "Login" vs. user menu swap happens once
 * authStore exists (milestone 4). For now it always renders the Login CTA.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary-dark text-white">
      <PageContainer className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg" onClick={() => setIsOpen(false)}>
          <span className="h-9 w-9 rounded-full bg-white/10" aria-hidden="true" />
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

        <Link
          to="/login"
          className="hidden md:inline-flex items-center rounded-full border border-accent px-5 py-1.5 text-sm font-body text-accent transition-colors hover:bg-accent hover:text-primary-dark"
        >
          Login
        </Link>

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
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex w-fit items-center rounded-full border border-accent px-5 py-1.5 text-sm text-accent"
            >
              Login
            </Link>
          </PageContainer>
        </nav>
      )}
    </header>
  );
}
