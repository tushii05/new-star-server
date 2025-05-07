"use server";
const getGallery = async (lang_id) => {
  try {
    const resUser = await fetch(
      `${process.env.NEXT_API_URL}/api/gallery/${lang_id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resUser.ok) {
      throw new Error("Failed to fetch gallery");
    }

    const data = await resUser.json();
    return data.data.gallery || [];
  } catch (error) {
    console.error("Error fetch gallery:", error);
    return { data: [] };
  }
};

const getGalleryAlbum = async (id, categoryId) => {
  try {
    const resGalleryDetails = await fetch(
      `${process.env.NEXT_API_URL}/api/gallery/category/data?id=${id}&categoryId=${categoryId}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resGalleryDetails.ok) {
      throw new Error("Failed to fetch gallery details");
    }

    const data = await resGalleryDetails.json();
    const album = data.data.data.album ?? [];
    album.categories.unshift({
      id: "",
      name: "All",
    });
    const gallery = data.data.data.gallery?.items ?? {};
    return { album, gallery };
  } catch (error) {
    console.error("Error fetching gallery details:", error);
    return { album: [], gallery: [] };
  }
};

export { getGallery, getGalleryAlbum };
