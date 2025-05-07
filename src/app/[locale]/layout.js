import "./globals.css";

import siteSettings from "@/services/siteSettings.service";
import getLanguageId from "@/utils/langId";
import getMetaData from "@/utils/getMetaData";
import SessionProviderRoot from "@/components/sessionProvider/sessionProvider";
import dynamic from "next/dynamic";

const MaintenanceMode = dynamic(
  () => import("@/components/maintenance-mode/maintenance-mode"),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import("@/components/cookie-consent/cookie-consent"),
  { ssr: false }
);

const LayoutWrapper = dynamic(() => import("./layout-wrapper"), { ssr: false });

export async function generateMetadata({ params }) {
  const metaData = await getMetaData(params);
  return metaData;
}

export default async function RootLayout({
  children,
  header,
  footer,
  widgets,
  params,
}) {
  const locale = params?.locale;
  const lang_id = await getLanguageId(locale);
  const { settings, generalSettings } = await siteSettings(lang_id);

  if (generalSettings?.maintenance_mode_status) {
    return (
      <MaintenanceMode generalSettings={generalSettings} locale={locale} />
    );
  }
  return (
    <html lang={locale} id="root">
      {settings?.cookies_warning && <CookieConsent settings={settings} />}

      <body>
        <LayoutWrapper />
        {generalSettings?.custom_header_codes && (
          <div
            dangerouslySetInnerHTML={{
              __html: generalSettings.custom_header_codes,
            }}
          />
        )}
        <SessionProviderRoot>
          {header}
          <section className="pb-2 pt-2 ">
            <div className="container ">
              <div className="row">
                <div className="col-lg-8 col-md-7 position-relative ps-lg-0">
                  {children}
                </div>
                <div className="col-lg-4 col-md-5">{widgets}</div>
              </div>
            </div>
          </section>
          {children}

          {footer}
        </SessionProviderRoot>
        {generalSettings?.custom_footer_codes && (
          <div
            dangerouslySetInnerHTML={{
              __html: generalSettings.custom_footer_codes,
            }}
          />
        )}
        {generalSettings?.adsense_activation_code && (
          <div
            dangerouslySetInnerHTML={{
              __html: generalSettings.adsense_activation_code,
            }}
          />
        )}
      </body>
    </html>
  );
}
