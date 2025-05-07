import SideWidgets from "@/components/sections/sideWidgets";

export default function DefaultWidgets({ params }) {
  const { locale } = params;
  return <SideWidgets locale={locale} />;
}
