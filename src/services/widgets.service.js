// "use server";
const getWidgets = async (lang_id) => {
  try {
    const resUser = await fetch(
      `${process.env.NEXT_API_URL}/api/widgets?langId=${lang_id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resUser.ok) {
      throw new Error("Failed to fetch widgets");
    }

    const data = await resUser.json();
    return data.data || {};
  } catch (error) {
    console.error("Error fetch widgets:", error);
    return { data: {} };
  }
};

const getWidgetsByType = async (lang_id, type, page, pageSize) => {
  try {
    const resUser = await fetch(
      `${process.env.NEXT_API_URL}/api/widgets/case?langId=${lang_id}&caseType=${type}&page=${page}&pageSize=${pageSize}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resUser.ok) {
      throw new Error("Failed to fetch widgets By type");
    }

    const data = await resUser.json();
    return data.data?.[type] || {};
  } catch (error) {
    console.error("Error fetch widgets By type:", error);
    return { data: {} };
  }
};

export { getWidgets, getWidgetsByType };
