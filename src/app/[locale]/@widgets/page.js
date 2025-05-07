import SideWidgets from "@/components/sections/sideWidgets";

export default function page({ params }) {
  const { locale } = params;
  return <SideWidgets locale={locale} />;
}
