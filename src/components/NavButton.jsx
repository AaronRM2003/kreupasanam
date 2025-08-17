import React from "react";

export default function NavButton({ navOpen, toggleNav }) {
  return (
    <button
      className={`menu-toggle ${navOpen ? "active" : ""}`}
      onClick={toggleNav}
      aria-label="Toggle navigation"
      aria-expanded={navOpen}
      aria-controls="navigation"
    >
      ☰
    </button>
  );
}