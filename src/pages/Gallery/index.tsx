import { PageContainer } from '@components/layout/PageContainer';
import { Breadcrumb, ImagePlaceholder } from '@components/ui';
import { useGallery } from '@features/gallery/hooks/useGallery';

export default function Gallery() {
  const { data: images, isLoading, isError } = useGallery();

  return (
    <PageContainer className="py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]} />
      <h1 className="mt-3 font-heading text-2xl text-primary-dark">Gallery</h1>
      <p className="mt-2 max-w-xl text-sm text-primary-dark/60">
        Moments from worship, fellowship, and events across the AASTU Gibi Gubae community.
      </p>

      <div className="mt-8">
        {isLoading && <p className="py-12 text-center text-sm text-primary-dark/50">Loading gallery…</p>}
        {isError && <p className="py-12 text-center text-sm text-red-500">Couldn't load the gallery right now.</p>}
        {images && images.length === 0 && (
          <p className="py-12 text-center text-sm text-primary-dark/50">No photos have been added yet.</p>
        )}
        {images && images.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <figure key={image.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <ImagePlaceholder aspect="aspect-square" src={image.image_url} alt={image.title} className="rounded-none" />
                <figcaption className="p-4">
                  <p className="font-heading text-sm text-primary-dark">{image.title}</p>
                  {image.description && <p className="mt-1 text-xs text-primary-dark/60">{image.description}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
