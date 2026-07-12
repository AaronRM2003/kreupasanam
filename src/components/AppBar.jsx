import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NavButton from "./NavButton";
import "./AppBar.css";

export default function AppBar({ lang }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);
  const navRef = useRef(null);

  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );

  const toggleNav = () => setNavOpen((prev) => !prev);
  const closeNav = () => setNavOpen(false);

  // resize/orientation tracking
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

  // scroll tracking
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on outside click
  useEffect(() => {
    if (!navOpen) return;
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navOpen]);

  // Array mapping for cleaner code and guaranteed active styling
  const navItems = [
    { path: "home", label: "Home" },
    { path: "about", label: "About" },
    { path: "testimonies", label: "Testimonies" },
    { path: "oracles", label: "Oracles" },
    { path: "retreat", label: "Retreat" },
    { path: "prayers", label: "Prayers" },
    { path: "history", label: "History" }
  ];

  const navJSX = (
    <nav ref={navRef} className={`nav-links ${navOpen ? "open" : ""}`}>
      {navItems.map((item) => (
        <NavLink 
          key={item.path} 
          to={`/${lang}/${item.path}`} 
          onClick={closeNav}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="app-bar-wrapper">
      <header className={`app-bar ${scrolled ? "scrolled" : ""}`}>
        <h1 className={`logo ${scrolled ? "scrolled" : ""}`}>
          Kreupasanam Testimonies
        </h1>

        <NavButton navOpen={navOpen} toggleNav={toggleNav} />

        {(!isMobile || isLandscape) && navJSX}
      </header>

      {isMobile && !isLandscape && navJSX}
    </div>
  );
}