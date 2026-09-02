import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@components/layout/MainLayout';
import Home from '@pages/Home';
import Events from '@pages/Events';
import EventDetail from '@pages/EventDetail';
import Courses from '@pages/Courses';
import CourseDetail from '@pages/CourseDetail';
import Subgroups from '@pages/Subgroups';
import Magazine from '@pages/Magazine';
import Contact from '@pages/Contact';
import Login from '@pages/Login';
import Register from '@pages/Register';
import UiPreview from '@pages/UiPreview'; // TEMPORARY — remove with milestone 3

/**
 * Auth/role guards (ProtectedRoute, per Visitor/Registered/Sub-Admin/Admin
 * from the docs) get added here in milestone 4, once authStore exists.
 * Admin routes get their own layout — not nested under MainLayout — added
 * alongside the admin feature.
 */
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
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* TEMPORARY — remove this route once milestone 3 (Home page) uses these components for real */}
        <Route path="/_ui" element={<UiPreview />} />
      </Route>
    </Routes>
  );
}
