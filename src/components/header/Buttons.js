"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LoginModal = dynamic(() => import("../login/loginModal"));
const ProfileMenu = dynamic(() => import("./profileMenu"));

export default function HeaderButtons({ locale, user, size }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const openSidebar = (e) => {
    e.stopPropagation();
    const sideBar = document.getElementById("mySidenav");
    if (!sideBar) return;
    sideBar.style.width = "250px";
  };

  const closeSidebar = () => {
    const sideBar = document.getElementById("mySidenav");
    if (!sideBar) return;
    sideBar.style.width = "0px";
  };

  const handleRegister = async () => {
    const { default: customLangLink } = await import(
      "@/utils/custom-lang-link"
    );
    const targetUrl = customLangLink("/registration", locale);
    router.push(targetUrl);
    closeSidebar();
  };

  const handleLogin = () => {
    setOpen(!open);
    closeSidebar();
  };

  return (
    <>
      <div className="col-lg-3 col-sm col-7 text-end d-lg-block">
        {user && Object.keys(user).length ? (
          <ul className="d-none d-lg-flex justify-content-end list-unstyled profile-top-menu">
            <ProfileMenu
              user={user}
              locale={locale}
              size={size}
              className={"nav-link"}
            />
          </ul>
        ) : (
          <div className={`d-lg-block ${size === `sm` ? `d-block` : `d-none`}`}>
            <button
              className="btn btn-outline-primary fw-700 me-1"
              onClick={handleLogin}
            >
              Login
            </button>
            <button className="btn btn-primary" onClick={handleRegister}>
              Register
            </button>
          </div>
        )}

        <button
          onClick={openSidebar}
          className={`btn p-1 py-0 btn-outline-primary fw-700  ms-1 ${
            size === `sm` ? `d-none` : `d-lg-none d-inline-block`
          }`}
        >
          <svg
            width={31}
            height={31}
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 11C9 10.4469 9.44687 10 10 10H22C22.5531 10 23 10.4469 23 11C23 11.5531 22.5531 12 22 12H10C9.44687 12 9 11.5531 9 11ZM9 16C9 15.4469 9.44687 15 10 15H22C22.5531 15 23 15.4469 23 16C23 16.5531 22.5531 17 22 17H10C9.44687 17 9 16.5531 9 16ZM23 21C23 21.5531 22.5531 22 22 22H10C9.44687 22 9 21.5531 9 21C9 20.4469 9.44687 20 10 20H22C22.5531 20 23 20.4469 23 21Z"
              fill="#1E3A8A"
            />
          </svg>
        </button>
      </div>
      <LoginModal open={open} setOpen={setOpen} locale={locale} />
    </>
  );
}
