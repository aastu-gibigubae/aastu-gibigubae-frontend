export type CourseCategory = 'bible' | 'theology' | 'language';

export interface Lesson {
  id: string;
  title: string;
}

export interface CourseItem {
  id: string;
  title: string;
  category: CourseCategory;
  description: string;
  dateLabel: string;
  isoDate: string;
  time: string;
  location: string;
  instructor: string;
  weeks: string;
  aboutText: string;
  learnItems: string[];
  lessons: Lesson[];
}

export interface CourseFilters {
  search: string;
  category: 'all' | CourseCategory;
  sort: 'newest' | 'oldest';
}

export const DEFAULT_COURSE_FILTERS: CourseFilters = {
  search: '',
  category: 'all',
  sort: 'newest',
};
