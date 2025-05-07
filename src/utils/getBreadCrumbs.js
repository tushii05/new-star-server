export function getBreadCrumbs(types, nameSlug, data) {
  let result = {};
  if (types.includes("parent")) {
    const parent = data.parent.find(
      (item) => item.name_slug === nameSlug || item.slug === nameSlug
    );
    if (parent) {
      result.parent = parent.name || parent.title;
    }
  }

  if (types.includes("sub_parent")) {
    const subParent = data.sub_parent.find(
      (item) => item.name_slug === nameSlug || item.slug === nameSlug
    );
    if (subParent) {
      const parent = data.parent.find(
        (item) => item.id === subParent.parent_id
      );
      result.parent = parent ? parent.name || parent.title : null;
      result.sub_parent = subParent.name || subParent.title;
    }
  }

  if (types.includes("children")) {
    const child = data.children.find(
      (item) => item.name_slug === nameSlug || item.slug === nameSlug
    );
    if (child) {
      const subParent = data.sub_parent.find(
        (item) => item.id === child.sub_parent_id
      );
      const parent = data.parent.find((item) => item.id === child.parent_id);
      result.parent = parent ? parent.name : null;
      result.sub_parent = subParent ? subParent.name : null;
      result.children = child.name;
    }
  }

  return result;
}
