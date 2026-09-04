import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { UpcomingEvents } from './components/UpcomingEvents';
import { AcademicResources } from './components/AcademicResources';
import { SubgroupsSection } from './components/SubgroupsSection';
import { MagazineAndAnnouncements } from './components/MagazineAndAnnouncements';
import { RecordedSessions } from './components/RecordedSessions';
import { HistoryBanner } from './components/HistoryBanner';
import { Ticker } from './components/Ticker';

/**
 * Composition only — each section is a self-contained component under
 * ./components/ with its own mock data pulled from ./mockData. When a
 * section's feature (events, courses, subgroups, etc.) is wired to the
 * real API in milestone 5, only that section file changes.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <UpcomingEvents />
      <AcademicResources />
      <SubgroupsSection />
      <MagazineAndAnnouncements />
      <RecordedSessions />
      <HistoryBanner />
      <Ticker />
    </>
  );
}
