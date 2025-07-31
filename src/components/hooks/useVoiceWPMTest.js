import { useEffect, useState } from 'react';

export function useVoiceWPMTest(sampleText = 'This is a simple test sentence with exactly ten words.') {
  const [voiceResults, setVoiceResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (!window.speechSynthesis) return;

    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
      // Chrome may delay voice loading
      window.speechSynthesis.onvoiceschanged = () => {
        testVoices(window.speechSynthesis.getVoices());
      };
    } else {
      testVoices(voices);
    }

    function testVoices(voices) {
      const results = [];
      let current = 0;
      const totalWords = sampleText.trim().split(/\s+/).length;

      setIsTesting(true);

      const testNext = () => {
        if (current >= voices.length) {
          setVoiceResults(results);
          setIsTesting(false);
          return;
        }

        const voice = voices[current];
        const utterance = new SpeechSynthesisUtterance(sampleText);
        utterance.voice = voice;

        const startTime = performance.now();
        utterance.onend = () => {
          const endTime = performance.now();
          const durationSeconds = (endTime - startTime) / 1000;
          const wpm = (totalWords / durationSeconds) * 60;

          results.push({
            name: voice.name,
            lang: voice.lang,
            wpm: parseFloat(wpm.toFixed(2)),
            default: voice.default,
            localService: voice.localService,
          });

          current++;
          testNext();
        };

        speechSynthesis.speak(utterance);
      };

      testNext();
    }
  }, [sampleText]);

  return { voiceResults, isTesting };
}
