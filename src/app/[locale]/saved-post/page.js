import PostLayout from "@/components/postLayout/post-layout";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { getSavedPost } from "@/services/user.service";
import { permanentRedirect } from "next/navigation";

export default async function SavedPost({ params }) {
  const session = await getServerSession(authConfig);
  const savedPost = await getSavedPost(session?.user?.id, 1, 10);

  if (!session) {
    permanentRedirect("/");
  }
  return (
    <PostLayout
      categoriesData={savedPost}
      params={{ ...params, slug: "saved-post" }}
      breadcrumb={{ parent: "saved post" }}
      type="saved"
      saved={true}
    />
  );
}
