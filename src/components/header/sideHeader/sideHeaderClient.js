"use client";

export default function SideHeaderClient({ children }) {
  return (
    <div
      id="mySidenav"
      className="sidenav"
      onClick={(e) => {
        // e.preventDefault();
        e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
      }}
    >
      {children}
    </div>
  );
}
