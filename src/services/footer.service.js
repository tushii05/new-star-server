const footerService = async (lang_id) => {
  try {
    const [resFooter, resGeneralSetting, resWigets] = await Promise.all([
      fetch(`${process.env.NEXT_API_URL}/api/page/menu?lang_id=${lang_id}`, {
        
        next: { revalidate: 60 },
      }),
      fetch(
        `${process.env.NEXT_API_URL}/api/generalSettings?langId=${lang_id}`,
        {
          
          next: { revalidate: 60 },
        }
      ),
      fetch(`${process.env.NEXT_API_URL}/api/widgets?langId=${lang_id}`, {
        
        next: { revalidate: 60 },
      }),
    ]);

    if (!resFooter.ok || !resGeneralSetting.ok || !resWigets.ok) {
      throw new Error(
        "Failed to fetch topMenu, generalSetting, and categories 333333333333"
      );
    }

    const [resFooterData, resGeneralSettingData, resWigetsData] =
      await Promise.all([
        resFooter.json(),
        resGeneralSetting.json(),
        resWigets.json(),
      ]);

    const footerData = resFooterData.data.footerMenu ?? [];
    const generalSetting = resGeneralSettingData.generalSettings ?? {};
    const widgets = resWigetsData.data ?? [];

    return { footerData, generalSetting, widgets };
  } catch (error) {
    console.error(
      "Error fetching topMenu, generalSetting, and categories:",
      error
    );
    return { footerData: [], widgets: [], generalSetting: {} };
  }
};

export default footerService;
