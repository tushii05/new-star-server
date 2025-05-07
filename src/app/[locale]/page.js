import Home from "@/components/home/home";

export default async function page({ params }) {
  return <Home locale={params.locale} />;
}
