import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AppBar.css";

export default function AppBar({ lang }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navRef = useRef(null);

  const toggleNav = () => setNavOpen(prev => !prev);

  // Detect screen resize to update isMobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setNavOpen(false);
      }
    };
    if (navOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navOpen]);

  const navJSX = (
    <nav ref={navRef} className={`nav-links ${navOpen ? "open" : ""}`}>
 <NavLink to={`/${lang}/about`}>About</NavLink>
<NavLink to={`/${lang}/testimonies`}>Testimonies</NavLink>
<NavLink to={`/${lang}/oracles`}>Oracles</NavLink>
<NavLink to={`/${lang}/dhyanam`}>Dhyanam</NavLink>

    </nav>
  );

  return (
    <div className="app-bar-wrapper">
      <header className={`app-bar ${scrolled ? "scrolled" : ""}`}>
        <h1 className={`logo ${scrolled ? "scrolled" : ""}`}>
          Kreupasanam Testimonies
        </h1>

        <button
          className={`menu-toggle ${navOpen ? "active" : ""}`}
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {!isMobile && navJSX}
      </header>

      {/* Render nav OUTSIDE header only if mobile */}
      {isMobile && navJSX}
    </div>
  );
}
