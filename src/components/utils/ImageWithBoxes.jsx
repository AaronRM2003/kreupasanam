import { useEffect, useRef, useState } from "react";
import AutoFitText from "./Utils";
import "./imageWithBoxes.css";

const ORIGINAL_WIDTH = 1280;
const ORIGINAL_HEIGHT = 720;

export default function ImageWithBoxes({
  src,
  data,
  lang,
  preloadOnly = false,
  onImageLoad,
}) {
  const imgRef = useRef(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [ready, setReady] = useState(false);


  const handleImageLoad = () => {
    if (onImageLoad) onImageLoad();

    if (preloadOnly) return;

    const img = imgRef.current;
    if (!img) return;

    setScale({
      x: img.clientWidth / ORIGINAL_WIDTH,
      y: img.clientHeight / ORIGINAL_HEIGHT,
    });
  };
  useEffect(() => {
  if (!imgRef.current || preloadOnly) return;

  const img = imgRef.current;

  const updateScale = () => {
    const rect = img.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    setScale({
      x: rect.width / ORIGINAL_WIDTH,
      y: rect.height / ORIGINAL_HEIGHT,
    });
    setReady(true);
  };

  // initial measure
  updateScale();

  const observer = new ResizeObserver(updateScale);
  observer.observe(img);

  return () => observer.disconnect();
}, [src, preloadOnly]);

  /* ✅ NO OVERLAY CASE */
  if (!data || !data.boxes?.length || preloadOnly) {
    return (
      <div className="image-wrapper">
        <img
          ref={imgRef}
          src={src}
          alt=""
          onLoad={handleImageLoad}
          onError={handleImageLoad}
        />
      </div>
    );
  }

  /* ✅ SAFE DESTRUCTURE */
  const { boxes = [], texts = {} } = data;

  return (
    <div className="image-wrapper">
      <img
        ref={imgRef}
        src={src}
        alt=""
        onLoad={handleImageLoad}
        onError={handleImageLoad}
      />

      {boxes.map((box, i) => {
        const w = box.w * scale.x;
        const h = box.h * scale.y;
        const text = texts?.[lang]?.[i] ?? "";

        return (
          <div
            key={i}
             className={`overlay-box ${ready ? "overlay-visible" : ""}`}
            style={{
              left: box.x * scale.x,
              top: box.y * scale.y,
              width: w,
              height: h,
              backgroundColor: box.background,
              borderRadius: "12px",        // 🔥 Add this

            }}
          >
            <AutoFitText
              key={`${lang}-${i}`}  
              text={text}
              width={w}
              height={h}
              color={box.fontColor}
              lang={lang}
              fontFamily="Inter"
            />
          </div>
        );
      })}
    </div>
  );
}
