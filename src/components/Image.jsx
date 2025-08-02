import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Image.css";

export default function ImageSpacer({
  src,
  alt = "Image",
  position = "left",
  marginSize = "80px",
  className = "",
  maxWidth = "50%",
  hideOnMobile = false,
}) {
  const wrapperRef = useRef(null);
  const [isVisibleMobile, setIsVisibleMobile] = useState(true);
  const [isVisibleWrap, setIsVisibleWrap] = useState(true);

  // Mobile visibility logic (portrait + landscape)
  useEffect(() => {
   const checkMobile = () => {
  const isUserAgentMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const isSmallViewport = window.innerWidth <= 812 || window.innerHeight <= 500;

  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (hideOnMobile && (isUserAgentMobile || isSmallViewport || isTouchDevice)) {
    setIsVisibleMobile(false);
  } else {
    setIsVisibleMobile(true);
  }
};


    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [hideOnMobile]);

  // Hide if wrapped onto a new line
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const parent = wrapper?.parentElement;
    if (!wrapper || !parent) return;

    const checkWrap = () => {
      const wrapperTop = wrapper.getBoundingClientRect().top;
      const parentTop = parent.getBoundingClientRect().top;
      const isWrapped = wrapperTop > parentTop + 10;
      setIsVisibleWrap(!isWrapped);
    };

    const observer = new ResizeObserver(checkWrap);
    observer.observe(wrapper);
    observer.observe(parent);
    window.addEventListener("resize", checkWrap);

    checkWrap();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkWrap);
    };
  }, []);

  const isVisible = isVisibleMobile && isVisibleWrap;
  if (!isVisible) return null;

  return (
    <div
      ref={wrapperRef}
      className={`image-spacer-wrapper ${position === "left" ? "margin-right" : "margin-left"} ${className}`}
      style={{
        marginRight: position === "left" ? marginSize : undefined,
        marginLeft: position === "right" ? marginSize : undefined,
        maxWidth,
        flexShrink: 0,
        flexGrow: 0,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="image-spacer"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain", // ✅ add this
        }}
      />

      <div className="image-ground-shadow"></div>
    </div>
  );
}

ImageSpacer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  position: PropTypes.oneOf(["left", "right"]),
  marginSize: PropTypes.string,
  className: PropTypes.string,
  maxWidth: PropTypes.string,
  hideOnMobile: PropTypes.bool,
};
