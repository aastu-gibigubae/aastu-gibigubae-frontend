import { useState } from 'react';
import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, ImagePlaceholder, Pagination, SearchInput } from '@components/ui';
import { useCourses } from '@features/courses/hooks/useCourses';
import { CourseCard } from '@features/courses/components/CourseCard';
import { CourseCategoryTabs } from '@features/courses/components/CourseCategoryTabs';
import { DEFAULT_COURSE_FILTERS, type CourseFilters } from '@features/courses/types';

export default function Courses() {
  const [filters, setFilters] = useState<CourseFilters>(DEFAULT_COURSE_FILTERS);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useCourses(filters, page);

  function updateFilters(next: CourseFilters) {
    setFilters(next);
    setPage(1);
  }

  return (
    <div>
      <div className="relative overflow-hidden bg-ink text-white">
        <ImagePlaceholder aspect="aspect-video" tone="dark" className="absolute inset-0 h-full w-full rounded-none opacity-40" />
        <PageContainer className="relative py-14">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Courses' }]} />
          <h1 className="mt-4 font-heading text-3xl">
            Our <span className="text-accent">Courses</span>
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Discover upcoming programs, conferences, fellowship, and gathering. Join us and grow in faith together.
          </p>
        </PageContainer>
      </div>

      <PageContainer className="py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder="Search courses by title, speaker, keyword"
            className="max-w-md flex-1"
            value={filters.search}
            onChange={(e) => updateFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="mt-6">
          <CourseCategoryTabs value={filters.category} onChange={(category) => updateFilters({ ...filters, category })} />
        </div>

        <div className="mt-8">
          {isLoading && <p className="py-12 text-center text-sm text-primary-dark/50">Loading courses…</p>}
          {isError && (
            <p className="py-12 text-center text-sm text-red-500">Couldn't load courses right now. Please try again.</p>
          )}
          {data && data.items.length === 0 && (
            <p className="py-12 text-center text-sm text-primary-dark/50">No courses match your search.</p>
          )}

          {data && data.items.length > 0 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.items.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} className="mt-10" />
            </>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
