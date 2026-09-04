import { Link } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { Card, ImagePlaceholder } from '@components/ui';
import { academicResources } from '../mockData';

export function AcademicResources() {
  return (
    <section className="bg-surface py-14">
      <PageContainer>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-xl text-primary-dark">Academic Resources</h2>
            <p className="mt-1 text-sm text-primary-dark/60">Expand your knowledge about our church</p>
          </div>
          <Link to="/courses" className="text-sm font-body text-primary hover:underline">
            View all →
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {academicResources.map((resource) => (
            <Link key={resource.id} to={`/courses/${resource.id}`} className="block">
              <Card media={<ImagePlaceholder />}>
                <h3 className="font-heading text-base text-primary-dark">{resource.title}</h3>
                <p className="mt-1 text-xs text-primary-dark/50">{resource.author}</p>
                <p className="mt-2 text-xs text-primary-dark/50">
                  {resource.weeks} &middot; {resource.students} students
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
