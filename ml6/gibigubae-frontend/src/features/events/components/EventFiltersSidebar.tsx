import { Button, Checkbox, Input, Select } from '@components/ui';
import type { EventCategory, EventFilters, EventStatus } from '../types';
import { DEFAULT_EVENT_FILTERS } from '../types';

const CATEGORY_OPTIONS: { value: EventCategory; label: string }[] = [
  { value: 'worship', label: 'Worship' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'course', label: 'Course' },
  { value: 'conference', label: 'Conference' },
];

const STATUS_OPTIONS: { value: EventStatus; label: string }[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
  { value: 'featured', label: 'Featured' },
];

const LOCATION_OPTIONS = [
  { value: 'AASTU', label: 'AASTU' },
  { value: 'Off-campus', label: 'Off-campus' },
];

interface EventFiltersSidebarProps {
  filters: EventFilters;
  onChange: (filters: EventFilters) => void;
}

export function EventFiltersSidebar({ filters, onChange }: EventFiltersSidebarProps) {
  function toggleCategory(value: EventCategory) {
    const categories = filters.categories.includes(value)
      ? filters.categories.filter((c) => c !== value)
      : [...filters.categories, value];
    onChange({ ...filters, categories });
  }

  function toggleStatus(value: EventStatus) {
    const statuses = filters.statuses.includes(value)
      ? filters.statuses.filter((s) => s !== value)
      : [...filters.statuses, value];
    onChange({ ...filters, statuses });
  }

  return (
    <aside className="w-full rounded-2xl border border-primary-dark/10 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm text-primary-dark">Filters</h3>
        <button
          type="button"
          className="text-xs font-body text-primary hover:underline"
          onClick={() => onChange(DEFAULT_EVENT_FILTERS)}
        >
          Clear All
        </button>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-body text-primary-dark">Category</legend>
        <div className="mt-2 space-y-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.value}
              label={opt.label}
              checked={filters.categories.includes(opt.value)}
              onChange={() => toggleCategory(opt.value)}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <Input
          label="Date"
          type="date"
          value={filters.date}
          onChange={(e) => onChange({ ...filters, date: e.target.value })}
        />
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-body text-primary-dark">Status</legend>
        <div className="mt-2 space-y-2">
          {STATUS_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.value}
              label={opt.label}
              checked={filters.statuses.includes(opt.value)}
              onChange={() => toggleStatus(opt.value)}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <Select
          label="Location"
          placeholder="All location"
          options={LOCATION_OPTIONS}
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
        />
      </div>

      <Button variant="primary" fullWidth className="mt-6" onClick={() => onChange({ ...filters })}>
        Apply Filters
      </Button>
    </aside>
  );
}
