import { Link } from 'react-router-dom';
import { Card, ImagePlaceholder, buttonStyles } from '@components/ui';
import type { CourseItem } from '../types';

export function CourseSummaryCard({ course }: { course: CourseItem }) {
  return (
    <Card media={<ImagePlaceholder />}>
      <h3 className="font-heading text-base text-primary-dark">{course.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-primary-dark/60">{course.description}</p>
      <p className="mt-2 text-xs text-primary-dark/50">{course.lessons.length} lessons</p>
      <Link
        to={`/courses/${course.id}`}
        className={buttonStyles({ variant: 'outline', size: 'sm', fullWidth: true, className: 'mt-3' })}
      >
        View Course
      </Link>
    </Card>
  );
}
