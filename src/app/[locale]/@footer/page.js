import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/footer/footer"), {
  ssr: false,
});

export default async function page({ params: { locale } }) {
  return <Footer locale={locale} />;
}
