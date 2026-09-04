import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AnnouncementBar } from './AnnouncementBar';
import { Footer } from './Footer';

/**
 * Layout for every public-facing route. Admin routes (milestone 5+) will get
 * a separate AdminShell rather than reusing this — different nav, no footer.
 */
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnnouncementBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
