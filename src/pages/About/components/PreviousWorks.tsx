import { PageContainer } from '@components/layout/PageContainer';
import { ImagePlaceholder } from '@components/ui';

export function PreviousWorks() {
  return (
    <section className="py-14">
      <PageContainer className="grid items-center gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-heading text-xl text-primary-dark">Previous Works</h2>
          <h3 className="mt-4 font-heading text-lg text-primary-dark">Ye Begena Timihret</h3>
          <p className="mt-2 text-sm leading-relaxed text-primary-dark/60">
            This course was led by previous graduate students and was a successful course, bringing together
            students to learn and grow through music and worship together.
          </p>
        </div>
        <ImagePlaceholder aspect="aspect-[4/3]" />
      </PageContainer>
    </section>
  );
}
