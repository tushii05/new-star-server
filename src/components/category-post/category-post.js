import PostLayout from "@/components/postLayout/post-layout";

export default async function CategoryPost({ params, breadcrumb, data }) {
  return (
    <>
      <PostLayout
        categoriesData={data}
        breadcrumb={breadcrumb}
        params={params}
        type="category"
      />
    </>
  );
}
