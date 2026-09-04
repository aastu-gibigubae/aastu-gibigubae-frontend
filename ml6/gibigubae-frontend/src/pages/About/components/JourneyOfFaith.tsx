import { useState } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { journeyMilestones } from '../mockData';

export function JourneyOfFaith() {
  const [index, setIndex] = useState(0);
  const milestone = journeyMilestones[index];

  function go(delta: number) {
    setIndex((current) => (current + delta + journeyMilestones.length) % journeyMilestones.length);
  }

  return (
    <section className="py-14">
      <PageContainer>
        <h2 className="text-center font-heading text-2xl text-primary-dark">Our Journey of Faith</h2>

        <div className="mt-8 flex items-center justify-center gap-4">
          <ArrowButton direction="left" onClick={() => go(-1)} />
          <div className="w-full max-w-2xl rounded-2xl bg-surface p-8 text-center sm:p-10">
            <p className="font-body text-sm font-medium text-accent">{milestone.year}</p>
            <h3 className="mt-2 font-heading text-xl text-primary-dark">{milestone.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-dark/60">{milestone.text}</p>
          </div>
          <ArrowButton direction="right" onClick={() => go(1)} />
        </div>

        <div className="mt-5 flex items-center justify-center gap-1.5">
          {journeyMilestones.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to ${item.year}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? 'bg-primary-dark' : 'bg-primary-dark/20'}`}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-dark/15 text-primary-dark transition-colors hover:bg-primary-dark hover:text-white sm:flex"
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d={direction === 'left' ? 'm12.5 5-5 5 5 5' : 'm7.5 5 5 5-5 5'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
