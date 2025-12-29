import { useRef, useState } from "react";
import AutoFitText from "./Utils";

const ORIGINAL_WIDTH = 1280;
const ORIGINAL_HEIGHT = 720;

export default function ImageWithBoxes({ src, data, lang, preloadOnly = false,
  onImageLoad}) {
  const imgRef = useRef(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });

  const { boxes, texts } = data;

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


  return (
    <div className="image-wrapper">
      <img
        ref={imgRef}
        src={src}
        alt=""
        onLoad={handleImageLoad}
      />

      {!preloadOnly && boxes.map((box, i) => {
        const w = box.w * scale.x;
        const h = box.h * scale.y;

        const text =
          texts?.[lang]?.[i] ?? ""; // SAFE access

        return (
          <div
            key={i}
            className="overlay-box"
            style={{
              left: box.x * scale.x,
              top: box.y * scale.y,
              width: w,
              height: h,
              backgroundColor: box.background,
            }}
          >
            <AutoFitText
              text={text}
              width={w}
              height={h}
              color={box.fontColor}
              fontFamily="Inter"
            />
          </div>
        );
      })}
    </div>
  );
}
