/**
 * The reference design shows an Amharic scripture verse here that rotates
 * on a timer. Using an English placeholder rather than guessing at specific
 * scripture text from a screenshot — swap `text` for real content (and wire
 * up rotation) once that's supplied.
 */
const PLACEHOLDER_SLIDES = [
  'Verse of the Day — placeholder text goes here.',
  'Verse of the Day — placeholder text goes here.',
  'Verse of the Day — placeholder text goes here.',
];

export function Ticker() {
  const activeIndex = 0;

  return (
    <section className="bg-accent py-3 text-primary-dark">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center">
        <p className="font-body text-sm">{PLACEHOLDER_SLIDES[activeIndex]}</p>
        <div className="flex items-center gap-1.5" role="presentation">
          {PLACEHOLDER_SLIDES.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 w-1.5 rounded-full ${index === activeIndex ? 'bg-primary-dark' : 'bg-primary-dark/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
