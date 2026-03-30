import { useState } from "react";
import styles from "./TTSReviewBox.module.css";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNwuHVWL5S5ynaEriKScf1lhF7tUGtimxcIbIBUrcLKX-vxuT6SRIDpYD6xI6VSstO/exec"; // replace

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

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",   // ✅ KEY FIX
        body: JSON.stringify({
          videoRating,
          voiceRating,
          feedback,
          page: window.location.pathname,
          lang: navigator.language,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log("✅ Review sent");
    } catch (err) {
      console.error("❌ Error:", err);
    }

    localStorage.setItem("tts_review_done", "true");
    setSubmitted(true);

    setTimeout(() => onClose(), 1500);
  };

  const StarRow = ({ value, setValue }) => {
    return (
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
  };

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
              placeholder="Optional feedback..."
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