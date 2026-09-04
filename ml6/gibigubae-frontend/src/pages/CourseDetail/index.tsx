import { useParams } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { Badge, Breadcrumb, ImagePlaceholder } from '@components/ui';
import { useCourse, useRelatedCourses } from '@features/courses/hooks/useCourses';
import { CourseSummaryCard } from '@features/courses/components/CourseSummaryCard';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, isLoading, isError } = useCourse(courseId);
  const { data: related } = useRelatedCourses(course?.id, course?.category);

  if (isLoading) {
    return <PageContainer className="py-16 text-center text-sm text-primary-dark/50">Loading course…</PageContainer>;
  }

  if (isError || !course) {
    return (
      <PageContainer className="py-16 text-center">
        <p className="text-sm text-red-500">We couldn't find that course.</p>
      </PageContainer>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden bg-ink text-white">
        <ImagePlaceholder aspect="aspect-video" tone="dark" className="absolute inset-0 h-full w-full rounded-none opacity-40" />
        <PageContainer className="relative py-14">
          <Breadcrumb
            items={[{ label: 'Home', to: '/' }, { label: 'Courses', to: '/courses' }, { label: course.title }]}
          />
          <h1 className="mt-4 font-heading text-3xl">{course.title}</h1>
        </PageContainer>
      </div>

      <PageContainer className="py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-primary-dark/10 p-6">
            <h2 className="font-heading text-lg text-primary-dark">About This Course</h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-dark/70">{course.aboutText}</p>
          </div>

          <div className="rounded-2xl border border-primary-dark/10 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg text-primary-dark">Course Contents</h2>
              <Badge tone="neutral">{course.lessons.length} lessons</Badge>
            </div>
            <ol className="mt-4 space-y-3">
              {course.lessons.map((lesson, index) => (
                <li key={lesson.id} className="flex items-center gap-3 text-sm text-primary-dark/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-medium text-primary-dark">
                    {index + 1}
                  </span>
                  {lesson.title}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-primary-dark/10 p-6">
          <h2 className="font-heading text-lg text-primary-dark">What You'll Learn</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {course.learnItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-primary-dark/80">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-accent text-primary-dark">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {related && related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading text-xl text-primary-dark">Related Courses</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((item) => (
                <CourseSummaryCard key={item.id} course={item} />
              ))}
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
