const getUserService = async (userId) => {
  try {
    const resUser = await fetch(
      `${process.env.NEXT_API_URL}/api/user/${userId}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resUser.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await resUser.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { data: {} };
  }
};

const getSavedPost = async (userId, page, pageSize) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/user/postGet/${userId}?page=${page}&pageSize=${pageSize}`
    );
    if (!res.ok) {
      throw new Error("Failed to Get Saved Post", res);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error Get Saved Post:", error);
    return error;
  }
};

const getUserPosts = async (userId, page, limit) => {
  try {
    const resUser = await fetch(
      `${process.env.NEXT_API_URL}/api/user/posts/${userId}?limit=${limit}&page=${page} `,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resUser.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await resUser.json();
    // return data.data;
    return {
      totalPages: data?.data?.totalPages,
      currentPage: data?.data?.currentPage,
      data: data?.data,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { data: {} };
  }
};

const getRss = async (slug, lang_id) => {
  try {
    const resUser = await fetch(
      `${process.env.NEXT_API_URL}/api/user/rss/${slug}/${lang_id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resUser.ok) {
      throw new Error("Failed to fetch rss");
    }

    const data = await resUser.text();
    return data;
  } catch (error) {
    console.error("Error fetching rss:", error);
    return { data: {} };
  }
};

const createSavedPost = async (body) => {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/user/postSave`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to Save Post", res);
    }
    const data = await res.json();
    import("sonner").then((module) => module.toast(data?.data?.status));
    return data;
  } catch (error) {
    console.error("Error Save Post:", error);
    return error;
  }
};

const updateUser = async (body, id) => {
  const updateUserPromise = new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_API_URL}/api/user/profile/${id}`,
        {
          method: "PUT",
          body: body,
        }
      );

      if (!res.ok) {
        reject(new Error("Failed to Update User"));
        return;
      }

      const data = await res.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
  import("sonner").then((module) =>
    module.toast.promise(updateUserPromise, {
      loading: "Updating user...",
      success: (data) => `${data?.message ?? "User updated successfully!"}`,
      error: (error) => `Error: ${error.message}`,
    })
  );

  return updateUserPromise;
};

const changePassword = async (body) => {
  const updateUserPromise = new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_API_URL}/api/user/change-password`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!res.ok) {
        reject(new Error("Failed to Change Password"));
        return;
      }

      const data = await res.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
  import("sonner").then((module) =>
    module.toast.promise(updateUserPromise, {
      loading: "Updating Password...",
      success: (data) => `${data?.message ?? "Password updated successfully!"}`,
      error: (error) => `Error: ${error.message}`,
    })
  );

  return updateUserPromise;
};

const deleteAccount = async (body, userId) => {
  const updateUserPromise = new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_API_URL}/api/user/delete/${userId}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        reject(new Error(data?.message));
        return;
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
  import("sonner").then((module) =>
    module.toast.promise(updateUserPromise, {
      loading: "Deleting Account...",
      success: (data) => `${data?.message ?? "Account Deleted successfully!"}`,
      error: (error) => `Error: ${error.message}`,
    })
  );
  return updateUserPromise;
};

const updateFollowUnfollow = async (userId, follow_id) => {
  try {
    const resUser = await fetch(
      `${process.env.NEXT_API_URL}/api/user/follow/${userId}/${follow_id}`,
      {
        method: "POST",
      }
    );
    if (!resUser.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await resUser.json();
    import("sonner").then((module) => module.toast(data?.data?.status));
    return data.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { data: {} };
  }
};

export {
  getUserService,
  createSavedPost,
  getSavedPost,
  updateUser,
  getUserPosts,
  updateFollowUnfollow,
  changePassword,
  deleteAccount,
  getRss,
};
