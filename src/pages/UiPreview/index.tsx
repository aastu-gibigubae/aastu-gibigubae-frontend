import { useState } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  ImagePlaceholder,
  Input,
  Pagination,
  Pill,
  Select,
  SearchInput,
} from '@components/ui';

/**
 * TEMPORARY — lets us eyeball every ui/ primitive in one place before any
 * real page consumes them. Delete this file + its route once the Home page
 * (milestone 3) is wired up to real components.
 */
export default function UiPreview() {
  const [activePill, setActivePill] = useState('all');
  const [page, setPage] = useState(1);

  return (
    <PageContainer className="space-y-12 py-12">
      <h1 className="font-heading text-2xl text-primary-dark">UI Preview (temporary)</h1>

      <Section title="Breadcrumb">
        <Breadcrumb
          items={[{ label: 'Home', to: '/' }, { label: 'Courses', to: '/courses' }, { label: 'Church History' }]}
        />
      </Section>

      <Section title="Search">
        <SearchInput placeholder="Search events by title, speaker, keyword" className="max-w-md" />
      </Section>

      <Section title="Pagination">
        <Pagination page={page} totalPages={8} onPageChange={setPage} />
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Apply Filters</Button>
          <Button variant="accent" pill>
            Get Involved
          </Button>
          <Button variant="accent">Create Account</Button>
          <Button variant="outline">Details &gt;</Button>
          <Button variant="outlineAccent" pill>
            Login
          </Button>
          <Button variant="ghost">View more photos</Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section title="Inputs (light tone)">
        <div className="grid max-w-md gap-4">
          <Input label="Search" placeholder="Search events by title, speaker, keyword" />
          <Input label="Email" type="email" placeholder="you@example.com" error="This field is required" />
        </div>
      </Section>

      <Section title="Inputs + Select (dark tone — Register page style)" dark>
        <div className="grid max-w-md gap-4 sm:grid-cols-2">
          <Input tone="dark" placeholder="First name" />
          <Input tone="dark" placeholder="Last name" />
          <Select tone="dark" placeholder="Department" options={[{ label: 'Software Engineering', value: 'se' }]} />
          <Select tone="dark" placeholder="Gender" options={[{ label: 'Female', value: 'f' }, { label: 'Male', value: 'm' }]} />
        </div>
      </Section>

      <Section title="Checkboxes">
        <div className="flex flex-wrap gap-6">
          <Checkbox label="Worship" defaultChecked />
          <Checkbox label="Seminar" />
          <Checkbox label="Course" />
        </div>
      </Section>

      <Section title="Filter pills">
        <div className="flex flex-wrap gap-2">
          {['all', 'bible', 'theology', 'language'].map((key) => (
            <Pill key={key} active={activePill === key} onClick={() => setActivePill(key)}>
              {key === 'all' ? 'All' : key[0].toUpperCase() + key.slice(1)}
            </Pill>
          ))}
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex gap-3">
          <div className="relative w-40">
            <ImagePlaceholder />
            <Badge tone="onImage" className="absolute left-2 top-2">
              Bible
            </Badge>
          </div>
          <Badge tone="neutral">Neutral</Badge>
        </div>
      </Section>

      <Section title="Card (course/event pattern)">
        <div className="grid max-w-xs gap-4">
          <Card
            media={
              <>
                <ImagePlaceholder />
                <Badge tone="onImage" className="absolute left-2 top-2">
                  Bible
                </Badge>
              </>
            }
          >
            <h3 className="font-heading text-sm text-primary-dark">Orthodox Faith Foundation</h3>
            <p className="mt-1 text-xs text-primary-dark/60">
              A day to worship the birth of Jesus Christ. Join us and grow in faith together.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-primary-dark/10 pt-3">
              <span className="text-xs text-primary-dark/50">6 weeks</span>
              <Button variant="outline" size="sm">
                Details &gt;
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="ImagePlaceholder variants">
        <div className="flex flex-wrap items-end gap-4">
          <ImagePlaceholder className="w-48" aspect="aspect-video" />
          <ImagePlaceholder className="w-32" aspect="aspect-square" />
          <ImagePlaceholder className="w-20" round />
        </div>
      </Section>
    </PageContainer>
  );
}

function Section({ title, dark = false, children }: { title: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <section className={dark ? 'rounded-2xl bg-primary-dark p-6' : ''}>
      <h2 className={dark ? 'mb-4 font-heading text-sm text-white/70' : 'mb-4 font-heading text-sm text-primary-dark/70'}>
        {title}
      </h2>
      {children}
    </section>
  );
}
