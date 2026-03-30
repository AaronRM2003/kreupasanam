import { useState } from "react";
import styles from "./TTSReviewBox.module.css";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNwuHVWL5S5ynaEriKScf1lhF7tUGtimxcIbIBUrcLKX-vxuT6SRIDpYD6xI6VSstO/exec";

function getDeviceInfo() {
  const ua = navigator.userAgent;

  const isMobile = /Mobi|Android/i.test(ua);

  let os = "Unknown";
  if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "Mac";

  let browser = "Unknown";
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";

  return {
    device: isMobile ? "Mobile" : "Desktop",
    os,
    browser,
    screen: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language,
  };
}

export default function TTSReviewBox({ onClose }) {
  const [videoRating, setVideoRating] = useState(0);
  const [voiceRating, setVoiceRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    if (!videoRating || !voiceRating) return;

    setLoading(true);

    const payload = {
      videoRating,
      voiceRating,
      feedback,
      page: window.location.pathname,
      ...getDeviceInfo(),
      timestamp: new Date().toISOString(),
    };

    console.log("📦 FINAL PAYLOAD:", payload); // ✅ DEBUG

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8", // 🔥 CRITICAL FIX
        },
        body: JSON.stringify(payload),
      });

      console.log("✅ Sent to Google Sheet");
    } catch (err) {
      console.error("❌ Network error:", err);
    }

    localStorage.setItem("tts_review_done", "true");
    setSubmitted(true);

    setTimeout(() => onClose(), 1500);
  };

  const StarRow = ({ value, setValue }) => (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`${styles.star} ${i <= value ? styles.active : ""}`}
          onClick={() => setValue(i)}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        {!submitted ? (
          <>
            <h3 className={styles.title}>Rate your experience</h3>

            <div className={styles.section}>
              <p>🎬 Video Experience</p>
              <StarRow value={videoRating} setValue={setVideoRating} />
            </div>

            <div className={styles.section}>
              <p>🔊 Voice (Speech) Experience</p>
              <StarRow value={voiceRating} setValue={setVoiceRating} />
            </div>

            <textarea
              className={styles.textarea}
              placeholder="Tell us what you liked or what we can improve..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={!videoRating || !voiceRating || loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </>
        ) : (
          <div className={styles.thankYou}>
            ✨ Thank you for your feedback!
          </div>
        )}
      </div>
    </div>
  );
}