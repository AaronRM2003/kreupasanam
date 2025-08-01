import { useEffect, useState } from 'react';

export function useIsGoogleTTS() {
  const [isGoogleTTS, setIsGoogleTTS] = useState(false);

const isAndroid = () => /android/i.test(navigator.userAgent) && /mobile/i.test(navigator.userAgent);

  useEffect(() => {
    const detectGoogleVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const hasGoogleVoice = voices.some(v => v.name.toLowerCase().includes("google"));
      setIsGoogleTTS(isAndroid() && hasGoogleVoice);
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = detectGoogleVoice;
      detectGoogleVoice();
    }
  }, []);

  return { isGoogleTTS };
}
