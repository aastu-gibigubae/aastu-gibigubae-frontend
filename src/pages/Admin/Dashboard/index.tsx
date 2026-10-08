import { Link } from 'react-router-dom';

const MODULES = [
  { label: 'Events', to: '/admin/events', description: 'Create, publish, and manage events.' },
  { label: 'Leaders', to: '/admin/leaders', description: 'Manage leadership profiles.' },
  { label: 'Announcements', to: '/admin/announcements', description: 'Post and manage announcements.' },
  { label: 'Magazine', to: '/admin/magazine', description: 'Publish magazine issues.' },
  { label: 'Kiflats', to: '/admin/kiflats', description: 'Manage subgroups and sub-groups.' },
  { label: 'Gallery', to: '/admin/gallery', description: 'Manage gallery photos.' },
  { label: 'Alehu Bewere', to: '/admin/donations', description: 'Review donation subscriptions.' },
  { label: 'Admin Scopes', to: '/admin/scopes', description: 'Grant or revoke sub-admin permissions.' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-primary-dark">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-primary-dark/60">Manage AASTU Gibi Gubae website content.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((mod) => (
          <Link
            key={mod.to}
            to={mod.to}
            className="rounded-2xl border border-primary-dark/10 bg-white p-5 transition-colors hover:border-primary-dark/30"
          >
            <h2 className="font-heading text-base text-primary-dark">{mod.label}</h2>
            <p className="mt-1 text-xs text-primary-dark/60">{mod.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
