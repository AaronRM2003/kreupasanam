import { useEffect, useState } from 'react';

export function useTTSBenchmark(lang) {
  const [voiceWpsMap, setVoiceWpsMap] = useState({});
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      handleVoicesChanged();
    } else {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
  }, []);

  const benchmarkVoice = (voice, texts) => {
    // texts: array of sentences
    return new Promise(async (resolve) => {
      let totalWords = 0;
      let totalDuration = 0;

      for (const text of texts) {
        const words = text.trim().split(/\s+/).length;
        totalWords += words;

        await new Promise((res) => {
          const utter = new SpeechSynthesisUtterance(text);
          utter.voice = voice;
          utter.lang = lang;

          const start = performance.now();
          utter.onend = () => {
            const duration = (performance.now() - start) / 1000;
            totalDuration += duration;
            res();
          };

          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utter);
        });
      }

      const avgWps = totalWords / totalDuration;
      resolve({ voiceName: voice.name, wps: parseFloat(avgWps.toFixed(2)) });
    });
  };

  const runBenchmark = async () => {
    const voiceMap = {};

    // Define test sentences per language
    const testSentences = {
      hi: [
        "यह एक परीक्षण वाक्य है।",
        "यहाँ हम हिंदी वाक्यों के लिए गति माप रहे हैं।"
      ],
      en: [
        "This is a test sentence to measure speech speed.",
        "Here we are measuring speed for English sentences."
      ],
    };

    for (const voice of voices) {
      if (voice.lang.startsWith(lang)) {
        const texts = lang.startsWith('hi') ? testSentences.hi : testSentences.en;
        const { voiceName, wps } = await benchmarkVoice(voice, texts);
        voiceMap[voiceName] = wps;
      }
    }
    setVoiceWpsMap(voiceMap);
  };

  return {
    voices,
    voiceWpsMap,
    runBenchmark,
  };
}
