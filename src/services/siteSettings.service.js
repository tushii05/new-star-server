"use server";
const siteSettings = async (lang_id) => {
  try {
    const resSiteSettings = await fetch(
      `${process.env.NEXT_API_URL}/api/generalSettings?lang_id=${lang_id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resSiteSettings.ok) {
      throw new Error("Failed to fetch gallery details");
    }

    const data = await resSiteSettings.json();
    const generalSettings = data.generalSettings?.generalSettings?.[0] ?? {};
    const settings = data.generalSettings?.settings?.[0] ?? {};

    return { generalSettings, settings };
  } catch (error) {
    console.error("Error fetching gallery details:", error);
    return { generalSettings: {}, settings: {} };
  }
};

export default siteSettings;
