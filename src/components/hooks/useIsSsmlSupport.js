import { useEffect, useState } from 'react';

export function useSSMLSupportTest() {
  const [ssmlSupported, setSSMLSupported] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();

    // Try setting SSML input
    try {
      utter.text = '<speak>Hello <break time="500ms"/> world!</speak>';
      utter.lang = 'en-US';

      // Use a Google voice if available
      const voices = synth.getVoices();
      const googleVoice = voices.find(v => v.name.toLowerCase().includes('google'));
      if (googleVoice) {
        utter.voice = googleVoice;
      }

      // Create a temporary event listener to check if SSML renders or fails
      utter.onstart = () => {
        setSSMLSupported(true);
        synth.cancel(); // stop immediately, we just want to check support
      };

      utter.onerror = () => {
        setSSMLSupported(false);
      };

      synth.speak(utter);
    } catch (err) {
      setSSMLSupported(false);
    }
  }, []);

  return ssmlSupported;
}
