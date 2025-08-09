// useSelectedVoice.js
import { useState, useEffect } from 'react';

export function useSelectedVoice(lang) {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (!voices.length) return;
      const matchedVoice = voices.find(v =>
        v.lang.toLowerCase().startsWith(lang?.toLowerCase())
      ) || null;
      setVoice(matchedVoice);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }, [lang]);

  return voice;
}
