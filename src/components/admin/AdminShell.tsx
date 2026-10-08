import { NavLink, Outlet, Link } from 'react-router-dom';
import clsx from 'clsx';
import { images } from '@/assets/images';
import { useAuth } from '@hooks/useAuth';

const NAV_SECTIONS = [
  {
    title: 'Content',
    links: [
      { label: 'Events', to: '/admin/events' },
      { label: 'Leaders', to: '/admin/leaders' },
      { label: 'Announcements', to: '/admin/announcements' },
      { label: 'Magazine', to: '/admin/magazine' },
      { label: 'Kiflats', to: '/admin/kiflats' },
      { label: 'Gallery', to: '/admin/gallery' },
    ],
  },
  {
    title: 'Community',
    links: [{ label: 'Alehu Bewere', to: '/admin/donations' }],
  },
  {
    title: 'Access',
    links: [{ label: 'Admin Scopes', to: '/admin/scopes' }],
  },
] as const;

export function AdminShell() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 shrink-0 flex-col bg-primary-dark text-white lg:flex">
        <Link to="/admin" className="flex items-center gap-2 px-6 py-5">
          <img src={images.orgSealLogo} alt="AASTU Gibigubae" className="h-8 w-8 rounded-full object-cover" />
          <span className="font-heading text-sm">Admin Panel</span>
        </Link>

        <nav className="flex-1 space-y-6 px-4 pb-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="px-2 text-xs uppercase tracking-wide text-white/40">{section.title}</p>
              <div className="mt-2 space-y-1">
                {section.links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      clsx(
                        'block rounded-lg px-3 py-2 text-sm font-body transition-colors',
                        isActive ? 'bg-white/10 text-accent' : 'text-white/80 hover:bg-white/5',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link to="/" className="block text-xs text-white/50 hover:text-white/80">
            ← Back to site
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-primary-dark/10 bg-white px-6 py-4">
          <p className="font-heading text-sm text-primary-dark">
            {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
          </p>
          <button
            type="button"
            onClick={() => logout()}
            className="text-sm font-body text-primary-dark/60 hover:text-primary-dark"
          >
            Log out
          </button>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
