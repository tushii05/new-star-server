"use client";
export default function CloseBtn() {
  return (
    <a
      onClick={() => {
        const sideBar = document.getElementById("mySidenav");
        if (sideBar) {
          sideBar.style.width = "0px";
        }
      }}
      className="closebtn"
    >
      ×
    </a>
  );
}
