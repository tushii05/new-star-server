import Link from "next/link";
import { i18n } from "@/i18n.config";
import languageService from "@/services/language.service";
import Image from "next/image";

export default async function LocaleSwitcher({ locale }) {
  // const redirectedPathName = (localeShortForm) => {
  //   if (!pathName) return "/";

  //   const pathnameIsMissingLocale = i18n.locales.every(
  //     (locale) =>
  //       !pathName.startsWith(`/${locale.short_form}/`) &&
  //       pathName !== `/${locale.short_form}`
  //   );

  //   if (pathnameIsMissingLocale) {
  //     if (localeShortForm === i18n.defaultLocale) return pathName;
  //     return `/${localeShortForm}${pathName}`;
  //   } else {
  //     if (localeShortForm === i18n.defaultLocale) {
  //       const segments = pathName.split("/");
  //       const isHome = segments.length === 2;
  //       if (isHome) return "/";

  //       segments.splice(1, 1);
  //       return segments.join("/");
  //     }

  //     const segments = pathName.split("/");
  //     segments[1] = localeShortForm;
  //     return segments.join("/");
  //   }
  // };

  const redirectedPathName = (localeShortForm) => {
    if (typeof window !== "undefined") {
      window.document.cookie = `locale=${localeShortForm}; path=/; max-age=${
        60 * 60 * 24 * 30
      }`;
    }
    if (localeShortForm === i18n.defaultLocale) return "/";
    return `/${localeShortForm}`;
  };
  const { languages } = await languageService();
  return (
    <ul className="d-flex justify-content-end list-unstyled">
      <li className="nav-item dropdown drop-more">
        <div
          className="nav-link ms-45"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Image
            src="/images/icon/translate.svg"
            width={17}
            height={17}
            className="mx-1"
            alt="translate"
          />
          {languages?.length
            ? languages.find((item) => item.short_form === locale)?.name
            : null}

          <Image
            src="/images/icon/arrow-down-white.svg"
            width={19}
            height={19}
            className="mx-1"
            alt="translate"
          />
        </div>

        <ul className="dropdown-menu d-menu" aria-labelledby="navbarDropdown">
          {languages?.length
            ? languages.map((lang) => {
                return (
                  <li key={lang.id}>
                    <Link
                      className="dropdown-item"
                      href={redirectedPathName(lang.short_form)}
                    >
                      {lang.name}
                    </Link>
                  </li>
                );
              })
            : null}
        </ul>
      </li>
    </ul>
    // </div>
  );
}
