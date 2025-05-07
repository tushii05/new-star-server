const languageService = async () => {
  try {
    const resLanguage = await fetch(
      `${process.env.NEXT_API_URL}/api/language`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resLanguage.ok) {
      throw new Error("Failed to fetch language");
    }

    const data = await resLanguage.json();
    return {
      languages: data.data.languages.map((lang) => ({
        id: lang.id,
        short_form: lang.short_form,
        name: lang.name,
        language_code: lang.language_code,
      })),
      defaultLanguage: data.data.defaultLanguage,
    };
  } catch (error) {
    return {
      languages: [],
      defaultLanguage: {},
    };
  }
};

export default languageService;
