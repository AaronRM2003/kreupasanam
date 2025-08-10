import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AppBar.css";

export default function AppBar({ lang }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);
  const navRef = useRef(null);

  // To detect landscape dynamically, listen to resize and orientationchange events
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );

  // Toggle nav open/close
  const toggleNav = () => setNavOpen((prev) => !prev);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1100);
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Update scrolled state on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle click outside nav to close menu — this works reliably by
  // attaching listener once when navOpen is true, and removing on close
  useEffect(() => {
    if (!navOpen) return;

    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
          aria-expanded={navOpen}
          aria-controls="navigation"
        >
          ☰
        </button>

        {/* Always show nav inline in landscape/desktop */}
        {(!isMobile || isLandscape) && navJSX}
      </header>

      {/* Mobile portrait nav rendered outside for dropdown */}
      {isMobile && !isLandscape && navJSX}
    </div>
  );
}
