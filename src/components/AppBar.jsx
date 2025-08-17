import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NavButton from "./NavButton";
import "./AppBar.css";

export function NavLinks({ lang, navOpen, navRef, closeNav }) {
  return (
    <nav ref={navRef} className={`nav-links ${navOpen ? "open" : ""}`}>
      <NavLink to={`/${lang}/home`} onClick={closeNav}>Home</NavLink>
      <NavLink to={`/${lang}/about`} onClick={closeNav}>About</NavLink>
      <NavLink to={`/${lang}/testimonies`} onClick={closeNav}>Testimonies</NavLink>
      <NavLink to={`/${lang}/oracles`} onClick={closeNav}>Oracles</NavLink>
      <NavLink to={`/${lang}/dhyanam`} onClick={closeNav}>Dhyanam</NavLink>
    </nav>
  );
}

export default function AppBar({ lang }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);
  const navRef = useRef(null);

  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );

  const toggleNav = () => setNavOpen((prev) => !prev);

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

  const navJSX = (
    <nav ref={navRef} className={`nav-links ${navOpen ? "open" : ""}`}>
      <NavLink to={`/${lang}/home`}>Home</NavLink>
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

        {/* Reusable NavButton */}
        <NavButton navOpen={navOpen} toggleNav={toggleNav} />

        {(!isMobile || isLandscape) && navJSX}
      </header>

      {isMobile && !isLandscape && navJSX}
    </div>
  );
}
