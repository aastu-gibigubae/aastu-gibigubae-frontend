import churchExteriorFestive from './church-exterior-festive.jpg';
import kingDavidPainting from './king-david-painting.jpg';
import choirDrumPerformance from './choir-drum-performance.jpg';
import kirarPlayersRow from './kirar-players-row.jpg';
import candlelightCrowd1 from './candlelight-crowd-1.jpg';
import candlelightCrowd2 from './candlelight-crowd-2.jpg';
import outdoorProcession1 from './outdoor-procession-1.jpg';
import outdoorProcession2 from './outdoor-procession-2.jpg';
import aerialCongregation from './aerial-congregation.jpg';
import ornateChurchInterior from './ornate-church-interior.jpg';
import threeSaintsIcon from './three-saints-icon.jpg';
import orgSealLogo from './org-seal-logo.jpg';

export const images = {
  churchExteriorFestive,
  kingDavidPainting,
  choirDrumPerformance,
  kirarPlayersRow,
  candlelightCrowd1,
  candlelightCrowd2,
  outdoorProcession1,
  outdoorProcession2,
  aerialCongregation,
  ornateChurchInterior,
  threeSaintsIcon,
  orgSealLogo,
};

/** Rotation pool for cards that need a photo but don't have a specific one assigned — cycles through by index. */
export const photoPool = [
  candlelightCrowd1,
  candlelightCrowd2,
  outdoorProcession1,
  outdoorProcession2,
  choirDrumPerformance,
  kirarPlayersRow,
  aerialCongregation,
];

export function photoFromPool(index: number): string {
  return photoPool[index % photoPool.length];
}
