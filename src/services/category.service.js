// "use server";

const getCategoryType = async (slug, langId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/categories/slug?slug=${slug}&langId=${langId}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Category Type");
    }

    const data = await res.json();
    return {
      id: data.data.data?.id,
      type: data.data?.type,
      page_default_name: data.data.data?.page_default_name,
    };
  } catch (error) {
    console.error("Error fetching Category Type:", error);
    return {};
  }
};

const getCategoriesPosts = async (slug, page, pageSize, lang_id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/categories/category-post?name_slug=${slug}&page=${page}&pageSize=${pageSize}&lang_id=${lang_id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Categories Post");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Categories Post:", error);
    return { data: {} };
  }
};

const getMenu = async (langId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/categories?langId=${langId}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Menu");
    }

    const data = await res.json();
    const categories = data.data?.category ?? [];
    const menuLimit = data.data?.menuLimit ?? 0;
    return { categories, menuLimit };
  } catch (error) {
    console.error("Error fetching Menu:", error);
    return { categories: [], menuLimit: 0 };
  }
};

const getOtherMenu = async (lang_id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/page/menu?lang_id=${lang_id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Other Menu");
    }

    const data = await res.json();
    const topMenu = data.data?.topMenu ?? [];
    const footerMenu = data.data?.footerMenu ?? [];

    return { topMenu, footerMenu };
  } catch (error) {
    console.error("Error fetching Other Menu:", error);
    return { topMenu: [], footerMenu: [] };
  }
};

const getCategoriesBreadCrumbs = async (slug, type) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/categories/data/${slug}/${type}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Categories Breadcrumbs");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Categories Breadcrumbs:", error);
    return { data: {} };
  }
};

export {
  getCategoryType,
  getCategoriesPosts,
  getMenu,
  getOtherMenu,
  getCategoriesBreadCrumbs,
};
