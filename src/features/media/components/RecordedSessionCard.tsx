import { Button, Card, ImagePlaceholder } from '@components/ui';
import { photoFromPool } from '@/assets/images';
import type { RecordedSession } from '../types';

export function RecordedSessionCard({ session }: { session: RecordedSession }) {
  return (
    <Card media={<ImagePlaceholder src={photoFromPool(Number(session.id))} alt={session.title} />}>
      <h3 className="font-heading text-base text-primary-dark">{session.title}</h3>
      <p className="mt-1 text-xs text-primary-dark/60">{session.speaker}</p>
      <p className="text-xs text-primary-dark/50">{session.dateLabel}</p>
      <Button variant="outline" fullWidth className="mt-4">
        Watch Now
      </Button>
    </Card>
  );
}
