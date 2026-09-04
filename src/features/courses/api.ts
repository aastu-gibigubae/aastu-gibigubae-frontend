import type { CourseFilters, CourseItem } from './types';
import { MOCK_COURSES } from './mockData';
import type { PagedResult } from '@/types/api';
// import { apiClient } from '@services/apiClient'; // uncomment once GET /courses exists

const PAGE_SIZE = 3;

/**
 * TEMPORARY implementation — see features/events/api.ts for the same note.
 * Once GET /courses exists, replace the body with an apiClient.get call;
 * the signature and return shape already match.
 */
export async function getCourses(filters: CourseFilters, page: number): Promise<PagedResult<CourseItem>> {
  let items = [...MOCK_COURSES];

  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    items = items.filter(
      (course) => course.title.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query),
    );
  }
  if (filters.category !== 'all') {
    items = items.filter((course) => course.category === filters.category);
  }

  items.sort((a, b) =>
    filters.sort === 'oldest' ? a.isoDate.localeCompare(b.isoDate) : b.isoDate.localeCompare(a.isoDate),
  );

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;

  return { items: items.slice(start, start + PAGE_SIZE), total, totalPages };
}

export async function getCourseById(id: string): Promise<CourseItem | null> {
  return MOCK_COURSES.find((course) => course.id === id) ?? null;
}

export async function getRelatedCourses(courseId: string, category: CourseItem['category']): Promise<CourseItem[]> {
  return MOCK_COURSES.filter((course) => course.id !== courseId && course.category === category).slice(0, 3);
}
