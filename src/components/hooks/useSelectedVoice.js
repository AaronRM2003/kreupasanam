import { useState, useEffect } from "react";

export function useSelectedVoice(lang) {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    if (!lang) return;

    let cancelled = false;
    let retries = 0;
    const MAX_RETRIES = 15;

    const loadVoices = () => {
      if (cancelled) return;

      const voices = window.speechSynthesis.getVoices();

      // 🔁 Voices not ready yet → retry
      if (!voices.length && retries < MAX_RETRIES) {
        retries++;
        setTimeout(loadVoices, 100);
        return;
      }

      if (!voices.length) {
        console.warn("❌ No voices available after retries");
        return;
      }

      // ✅ Try exact → prefix → base match
      const matched =
        voices.find(v => v.lang.toLowerCase() === lang.toLowerCase()) ||
        voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase())) ||
        voices.find(v => v.lang.split("-")[0] === lang.split("-")[0]) ||
        null;

      if (!cancelled) {
        setVoice(matched);
      }
    };

    loadVoices();

    // 🔔 Chrome fires this late sometimes
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      cancelled = true;
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [lang]);

  return voice;
}
