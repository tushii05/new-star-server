import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/footer/footer"));
export default function DefaultFooter({ params: { locale } }) {
  return <Footer locale={locale} />;
}
