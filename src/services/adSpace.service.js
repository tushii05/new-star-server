"use server";

const adSpaceService = async () => {
  try {
    const resAdsSpace = await fetch(
      `${process.env.NEXT_API_URL}/api/ad_spaces`,
      { next: { revalidate: 60 } }
    );
    const data = await resAdsSpace.json();
    return { ad_spaces: data?.data?.ad_spaces };
  } catch (error) {
    console.error("Error fetching ad content:", error);
    return { ad_spaces: null };
  }
};
export { adSpaceService };
