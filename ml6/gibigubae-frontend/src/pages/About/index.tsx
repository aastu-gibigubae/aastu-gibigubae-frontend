import { AboutHero } from './components/AboutHero';
import { Leadership } from './components/Leadership';
import { JourneyOfFaith } from './components/JourneyOfFaith';
import { PreviousWorks } from './components/PreviousWorks';
import { MomentsOfFaith, JoinOurMission } from './components/MomentsAndMission';

export default function About() {
  return (
    <>
      <AboutHero />
      <Leadership />
      <JourneyOfFaith />
      <PreviousWorks />
      <MomentsOfFaith />
      <JoinOurMission />
    </>
  );
}
