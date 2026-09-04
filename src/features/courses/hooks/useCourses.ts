import { useQuery } from '@tanstack/react-query';
import { getCourseById, getCourses, getRelatedCourses } from '../api';
import type { CourseFilters, CourseItem } from '../types';

export function useCourses(filters: CourseFilters, page: number) {
  return useQuery({
    queryKey: ['courses', filters, page],
    queryFn: () => getCourses(filters, page),
    placeholderData: (previous) => previous,
  });
}

export function useCourse(id: string | undefined) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseById(id as string),
    enabled: Boolean(id),
  });
}

export function useRelatedCourses(courseId: string | undefined, category: CourseItem['category'] | undefined) {
  return useQuery({
    queryKey: ['courses', 'related', courseId, category],
    queryFn: () => getRelatedCourses(courseId as string, category as CourseItem['category']),
    enabled: Boolean(courseId && category),
  });
}
