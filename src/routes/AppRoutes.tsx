import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@components/layout/MainLayout';
import Home from '@pages/Home';
import Events from '@pages/Events';
import EventDetail from '@pages/EventDetail';
import Courses from '@pages/Courses';
import CourseDetail from '@pages/CourseDetail';
import Subgroups from '@pages/Subgroups';
import SubgroupDetail from '@pages/SubgroupDetail';
import Magazine from '@pages/Magazine';
import Contact from '@pages/Contact';
import About from '@pages/About';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Profile from '@pages/Profile';
import RecordedSessions from '@pages/RecordedSessions';
import Announcements from '@pages/Announcements';
import Gallery from '@pages/Gallery';
import Donations from '@pages/Donations';
import { ProtectedRoute } from '@components/routing/ProtectedRoute';
import { AdminShell } from '@components/admin/AdminShell';
import AdminDashboard from '@pages/Admin/Dashboard';
import AdminEvents from '@pages/Admin/Events';
import AdminLeaders from '@pages/Admin/Leaders';
import AdminAnnouncements from '@pages/Admin/Announcements';
import AdminMagazine from '@pages/Admin/Magazine';
import AdminKiflats from '@pages/Admin/Kiflats';
import AdminGallery from '@pages/Admin/Gallery';
import AdminDonations from '@pages/Admin/Donations';
import AdminScopes from '@pages/Admin/Scopes';
import DevAdminLogin from '@pages/DevAdminLogin'; // TEMPORARY — remove once real auth exists
import UiPreview from '@pages/UiPreview'; // TEMPORARY — remove with milestone 3

/**
 * Admin routes get their own layout — not nested under MainLayout — added
 * alongside the admin feature.
 */
/**
 * Dev-only pages (component preview, mock-token login). On in `npm run dev`;
 * in a deployed build they only exist when VITE_ENABLE_DEV_TOOLS=true, so
 * a staging deploy for the backend team can enable them and production can't.
 */
const ENABLE_DEV_TOOLS = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/subgroups" element={<Subgroups />} />
        <Route path="/subgroups/:id" element={<SubgroupDetail />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/media" element={<RecordedSessions />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/give" element={<Donations />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* TEMPORARY — remove this route once milestone 3 (Home page) uses these components for real */}
        {ENABLE_DEV_TOOLS && <Route path="/_ui" element={<UiPreview />} />}
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin', 'sub_admin']}>
            <AdminShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="leaders" element={<AdminLeaders />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="magazine" element={<AdminMagazine />} />
        <Route path="kiflats" element={<AdminKiflats />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="donations" element={<AdminDonations />} />
        <Route path="scopes" element={<AdminScopes />} />
      </Route>

      {/* TEMPORARY — remove once real auth exists; mints a session via POST /dev/mock-token for testing the admin panel */}
      {ENABLE_DEV_TOOLS && <Route path="/dev/admin-login" element={<DevAdminLogin />} />}
    </Routes>
  );
}
