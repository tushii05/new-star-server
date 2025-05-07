import GalleryDetails from "@/components/gallery/gallery-details";

export default async function Album({ params, searchParams }) {
  return <GalleryDetails params={params} searchParams={searchParams} />;
}
