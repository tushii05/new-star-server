// "use server";
const homeService = async (lang_id) => {
  try {
    const [resHome, resWidgets] = await Promise.all([
      fetch(`${process.env.NEXT_API_URL}/api/posts/home/${lang_id}`, {
        next: { revalidate: 60 },
      }),
      fetch(`${process.env.NEXT_API_URL}/api/widgets?langId=${lang_id}}`, {
        next: { revalidate: 60 },
      }),
    ]);

    if (!resHome.ok || !resWidgets.ok) {
      throw new Error("Failed to fetch home, widgets");
    }

    const [resHomeData, resWidgetsData] = await Promise.all([
      resHome.json(),
      resWidgets.json(),
    ]);

    const home = resHomeData.data ?? [];
    const widgets = resWidgetsData.data ?? {};

    return { home, widgets };
  } catch (error) {
    console.error("Error fetching home, widgets:", error);
    return { home: [], widgets: [] };
  }
};

export default homeService;
