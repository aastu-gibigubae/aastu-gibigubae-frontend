import { Pill } from '@components/ui';
import type { CourseFilters } from '../types';

const OPTIONS: { value: CourseFilters['category']; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bible', label: 'Bible' },
  { value: 'theology', label: 'Theology' },
  { value: 'language', label: 'Language' },
];

interface CourseCategoryTabsProps {
  value: CourseFilters['category'];
  onChange: (value: CourseFilters['category']) => void;
}

export function CourseCategoryTabs({ value, onChange }: CourseCategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => (
        <Pill key={opt.value} active={value === opt.value} onClick={() => onChange(opt.value)}>
          {opt.label}
        </Pill>
      ))}
    </div>
  );
}
