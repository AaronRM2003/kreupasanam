import { useState, useEffect, useRef, useMemo } from 'react';
import { FaVolumeUp, FaVolumeDown } from 'react-icons/fa';
import { useSelectedVoice } from '../hooks/useSelectedVoice';
import './speakerControl.css';
import VoiceTestScreen from './VoiceTestScreen';

export default function SubtitleVoiceControls({
  isSpeaking,
  volume,
  toggleSpeaking,
  handleVolumeChange,
  playerRef,
  lang,

  userLang,
}) {
  const [showControls, setShowControls] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [maxInteractionTimeout, setMaxInteractionTimeout] = useState(null);
  const [positionStyle, setPositionStyle] = useState({});
  const [buttonSize, setButtonSize] = useState(40);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [showTestScreen, setShowTestScreen] = useState(false);
  const [isLoadingTest, setIsLoadingTest] = useState(false);
  const effectiveLang = userLang || lang;


  // Keep all available voices from system
  const [systemVoices, setSystemVoices] = useState([]);
  // Voice selected in dropdown for test (defaults to voice from hook)
  const [testVoice, setTestVoice] = useState(null);
  // Track if the currently selected testVoice is already tested
  const [alreadyTested, setAlreadyTested] = useState(false);

  const utteranceRef = useRef(null);
  const pauseCheckInterval = useRef(null);

  const voiceFromHook = useSelectedVoice(effectiveLang);
  
  // Load system voices on mount and when voices changed
  useEffect(() => {
  function loadVoices() {
    const allVoices = window.speechSynthesis.getVoices();
    const filteredVoices = allVoices.filter(voice =>
      voice.lang.toLowerCase().startsWith(effectiveLang.toLowerCase())
    );
    setSystemVoices(filteredVoices);
  }

  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}, [effectiveLang]);

  // When voiceFromHook or systemVoices change, update testVoice and tested state
  useEffect(() => {
    if (!voiceFromHook) return;

    // Try to find the exact voiceFromHook in system voices
    const savedVoiceName = localStorage.getItem(`${effectiveLang}`);
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.voiceURI === savedVoiceName);
    console.log("matched voice",matchedVoice,savedVoiceName);
    const match = matchedVoice || systemVoices.find(v => v.name === voiceFromHook.name) || voiceFromHook;
    setTestVoice(match);

    // Check if tested
    const testKey = `voice_test_data_${effectiveLang}`;
    const storedData = localStorage.getItem(testKey);
    
    let tested = false;
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        const voiceTestData = parsed[testVoice.voiceURI];
        if (
          voiceTestData &&
          voiceTestData.voiceName === testVoice.name &&
          voiceTestData.lang === testVoice.lang
        ) {
          tested = true;
        }
      } catch {}
    }
    setAlreadyTested(tested);
  }, [voiceFromHook, systemVoices, lang]);

  const updatePosition = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isPortrait = height > width;

    // Detect device type roughly based on userAgent + screen size
    const userAgent = navigator.userAgent;

    const isMobileDevice = /Mobi|Android|iPhone|iPod/i.test(userAgent);
    const isTabletDevice =
      /iPad|Tablet|PlayBook|Silk/.test(userAgent) || // tablet UA hints
      (!isMobileDevice && width >= 600 && width <= 1024); // common tablet width range

    if (!isMobileDevice && !isTabletDevice) {
      // Desktop
      setPositionStyle({ right: '10%', top: '35%', bottom: 'auto' });
      setButtonSize(48);
    } else if (isTabletDevice) {
      if (isPortrait) {
        setPositionStyle({ right: '10%', bottom: '25%', top: 'auto' });
        setButtonSize(40);
      } else {
        // Tablet landscape
        setPositionStyle({ right: '8%', top: '40%', bottom: 'auto' });
        setButtonSize(35);
      }
    } else if (isMobileDevice) {
      // Phone/mobile
      if (isPortrait) {
        setPositionStyle({ right: '5%', bottom: '20%', top: 'auto' });
        setButtonSize(36);
      } else {
        setPositionStyle({ right: '4%', top: '40%', bottom: 'auto' });
        setButtonSize(25);
      }
    }
  };

  const languageMap = {
    en: 'English',
    hi: 'हिन्दी',
    zh: '中文',
    bn: 'বাংলা',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    fr: 'Français',
    es: 'Español',
    mr: 'मराठी',
    kn: 'ಕನ್ನಡ',
  };

  const testSentences = {
  en: "This is a test designed to ensure the highest possible accuracy of speech delivery and pronunciation. We sincerely thank you for your patience during this process.",
  hi: "यह परीक्षण भाषण की प्रस्तुति और उच्चारण की सर्वोच्च सटीकता सुनिश्चित करने के लिए बनाया गया है। इस प्रक्रिया के दौरान आपके धैर्य के लिए हम हृदय से धन्यवाद करते हैं।",
  zh: "此测试旨在确保语音表达和发音的最高准确性。感谢您在此过程中的耐心等待。",
  bn: "এই পরীক্ষা বক্তৃতা প্রদানের ধরন এবং উচ্চারণের সর্বোচ্চ সঠিকতা নিশ্চিত করার জন্য তৈরি করা হয়েছে। এই প্রক্রিয়ায় আপনার ধৈর্যের জন্য আমরা আন্তরিকভাবে কৃতজ্ঞ।",
  ta: "இந்தச் சோதனை, பேச்சு வழங்கல் மற்றும் உச்சரிப்பின் மிக உயர்ந்த துல்லியத்தை உறுதிப்படுத்த உருவாக்கப்பட்டுள்ளது. இந்த செயல்முறையின் போது உங்கள் பொறுமைக்கு எங்கள் இதயப்பூர்வமான நன்றிகள்.",
  te: "ఈ పరీక్ష, మాటల ఉచ్చారణ మరియు ప్రదర్శనలో గరిష్ట ఖచ్చితత్వాన్ని నిర్ధారించడానికి రూపొందించబడింది. ఈ ప్రక్రియలో మీ సహనానికి మా హృదయపూర్వక కృతజ్ఞతలు.",
  fr: "Ce test est conçu pour garantir la plus grande précision possible dans la livraison et la prononciation de la parole. Nous vous remercions sincèrement pour votre patience au cours de ce processus.",
  es: "Esta prueba está diseñada para garantizar la máxima precisión posible en la entrega y pronunciación del habla. Le agradecemos sinceramente su paciencia durante este proceso.",
  mr: "ही चाचणी भाषणाची सादरीकरण आणि उच्चारण यांची कमाल अचूकता सुनिश्चित करण्यासाठी तयार केली आहे. या प्रक्रियेदरम्यान आपल्या संयमाबद्दल आम्ही मनःपूर्वक आभारी आहोत.",
  kn: "ಈ ಪರೀಕ್ಷೆಯನ್ನು ಭಾಷಣದ ಪ್ರಸ್ತುತಿಕರಣ ಮತ್ತು ಉಚ್ಚಾರಣೆಯ ಗರಿಷ್ಠ ಖಚಿತತೆಯನ್ನು ಖಾತ್ರಿಪಡಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಈ ಪ್ರಕ್ರಿಯೆಯ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಸಹನಕ್ಕೆ ನಾವು ಹೃದಯಪೂರ್ವಕ ಧನ್ಯವಾದಗಳನ್ನು ಸಲ್ಲಿಸುತ್ತೇವೆ.",
};


  // Load voice matching the lang code (e.g. "en" matches "en-US", etc)

  useEffect(() => {
    setShowControls(true);
    setControlsVisible(true);

    const timer = setTimeout(() => {
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  useEffect(() => {
    let intervalId = null;

    if (showTestScreen) {
      pauseVideo();

      intervalId = setInterval(() => {
        if (playerRef?.current) {
          if (typeof playerRef.current.pause === 'function') {
            playerRef.current.pause();
          } else if (typeof playerRef.current.pauseVideo === 'function') {
            playerRef.current.pauseVideo();
          }
        }
      }, 500); // repeat pause every 500ms to prevent autoplay during test
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showTestScreen]);

  const clearAllTimeouts = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    if (maxInteractionTimeout) clearTimeout(maxInteractionTimeout);
  };
  const testKey = `voice_test_data_${lang}`;
  const storedData = localStorage.getItem(testKey);
  const tested = useMemo(() => {
  if (!storedData) return false;
  try {
    const parsed = JSON.parse(storedData);
    const voiceTestData = parsed[testVoice.voiceURI];
    return (
      voiceTestData &&
      voiceTestData.voiceName === testVoice.name &&
      voiceTestData.lang === testVoice.lang
    );
  } catch {
    return false;
  }
}, [storedData, testVoice]);
  const toggleControls = () => {
    clearAllTimeouts();
    setShowControls(true);
    setControlsVisible(true);

    const timeout = setTimeout(() => {
      if (!isInteracting) {
        setControlsVisible(false);
        setTimeout(() => setShowControls(false), 300);
      }
    }, 3000);
    setHideTimeout(timeout);
  };

  const startInteraction = () => {
    clearAllTimeouts();
    setIsInteracting(true);
    setControlsVisible(true);

    const maxTimeout = setTimeout(() => {
      setIsInteracting(false);
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 6000);
    setMaxInteractionTimeout(maxTimeout);
  };

  const endInteraction = () => {
    clearAllTimeouts();
    setIsInteracting(false);

    const timeout = setTimeout(() => {
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 3000);
    setHideTimeout(timeout);
  };

  // Pause video or schedule pause if not ready yet
  const pauseVideo = () => {
    if (!playerRef?.current) {
      // Start polling until playerRef.current is ready, then pause
      if (!pauseCheckInterval.current) {
        pauseCheckInterval.current = setInterval(() => {
          if (playerRef?.current) {
            if (typeof playerRef.current.pause === 'function') {
              playerRef.current.pause();
            } else if (typeof playerRef.current.pauseVideo === 'function') {
              playerRef.current.pauseVideo();
            }
            clearInterval(pauseCheckInterval.current);
            pauseCheckInterval.current = null;
          }
        }, 100);
      }
      return;
    }

    // Pause immediately if ready
    if (typeof playerRef.current.pause === 'function') {
      playerRef.current.pause();
    } else if (typeof playerRef.current.pauseVideo === 'function') {
      playerRef.current.pauseVideo();
    }
  };

  // Play video immediately
  const playVideo = () => {
    if (!playerRef?.current) return;
    if (typeof playerRef.current.play === 'function') {
      playerRef.current.play();
    } else if (typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo();
    }
  };

  // Handle Read Subtitles click - show test screen if not tested
const handleReadSubtitlesClick = (forceTest = false) => {
  if (isSpeaking) {
  toggleSpeaking();
  return;
}
  if (!('speechSynthesis' in window)) {
    alert("Text-to-Speech is not supported by your browser/device.");
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    alert("Voices are still loading, please wait a moment and try again.");
    return;
  }

  if (!testVoice) {
    alert("No suitable voice found for your language. Please check your device's Text-to-Speech settings.");
    return;
  }

  // Check if testVoice is really available in system voices (edge case)
  const voiceAvailable = voices.some(v => v.name === testVoice.name);
  if (!voiceAvailable) {
    const userAgent = navigator.userAgent.toLowerCase();
    let instructions = "Please check your device's Text-to-Speech settings to install or enable voices.";

    if (/windows/.test(userAgent)) {
      instructions = 
        "The selected voice is not available.\n" +
        "On Windows, go to Settings > Time & Language > Speech, then install or enable additional voices.";
    } else if (/macintosh|mac os x/.test(userAgent)) {
      instructions =
        "The selected voice is not available.\n" +
        "On macOS, open System Preferences > Accessibility > Speech, and add more voices if needed.";
    } else if (/android/.test(userAgent)) {
      instructions =
        "The selected voice is not available.\n" +
        "On Android, go to Settings > Accessibility > Text-to-Speech output, and install more voices.";
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      instructions =
        "The selected voice is not available.\n" +
        "On iOS, go to Settings > Accessibility > Spoken Content > Voices, and download additional voices.";
    } else if (/chrome/.test(userAgent)) {
      instructions =
        "The selected voice is not available.\n" +
        "In Chrome, voices load automatically. Try restarting your browser or check system TTS settings.";
    }

    alert(instructions);
    return;
  }

  const testKey = `voice_test_data_${lang}`;
  const storedData = localStorage.getItem(testKey);
  let needsTest = true;

if (storedData) {
  try {
    const parsed = JSON.parse(storedData);
    const voiceTestData = parsed[testVoice.voiceURI];
    if (
      voiceTestData &&
      voiceTestData.voiceName === testVoice.name &&
      voiceTestData.lang === testVoice.lang
    ) {
      needsTest = false;
    }
  } catch {
    needsTest = true;
  }
}
  

  // Now show test screen only if needsTest AND forceTest argument is true
  if (needsTest || forceTest) {
    setShowTestScreen(true);
    pauseVideo();
    return;
  }

  toggleSpeaking();
};

function shortCode(langTag) {
  return (langTag || "en").split("-")[0].toLowerCase();
}

  // Start the voice test reading and measure speed
  const startAccurateVoiceTest = (testSentence) => {
  let sentence = (testSentence || "").trim();

  // ✅ If base language is not English, always use predefined sentence
  if (lang !== "en") {
    sentence =
      testSentences[shortCode(effectiveLang)] ||
      "This is a quick test to ensure subtitles are read correctly in your selected voice.";
  }
  if (!sentence) return;
    if (!testVoice) return;

    setIsLoadingTest(true);
     const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.voice = testVoice;
    utterance.lang = effectiveLang;

    utteranceRef.current = utterance;

    let speechStartTime = null;

    utterance.onstart = () => {
      speechStartTime = performance.now();
    };

    utterance.onerror = () => {
      console.error("Speech synthesis error");
      setIsLoadingTest(false);
      setShowTestScreen(false);
      playVideo();
      utteranceRef.current = null;
    };

    utterance.onpause = () => {
      setIsLoadingTest(false);
      setShowTestScreen(false);
      playVideo();
      utteranceRef.current = null;
    };

    utterance.onend = () => {
      if (!utteranceRef.current) return;

      const speechEndTime = performance.now();
      const elapsedSeconds = (speechEndTime - speechStartTime) / 1000;
      const wordCount = sentence.trim().split(/\s+/).length;
      const wps = wordCount / elapsedSeconds;

      console.log(`Accurate WPS for "${testVoice.name}": ${wps.toFixed(2)} (time=${elapsedSeconds.toFixed(2)}s)`);

      const testData = {
        wps: wps.toFixed(2),
        voiceName: testVoice.name,
        voiceURI: testVoice.voiceURI,
        lang: testVoice.lang,
      };
      const testKey = `voice_test_data_${effectiveLang}`;
      const storedData = localStorage.getItem(testKey);
      let allTestData = {};

      if (storedData) {
        try {
          allTestData = JSON.parse(storedData);
        } catch {
          allTestData = {};
        }
      }

      allTestData[testVoice.voiceURI] = testData;

      localStorage.setItem(testKey, JSON.stringify(allTestData));
      localStorage.setItem(`${effectiveLang}`,testVoice.voiceURI);
      console.log("accuratetest - ", localStorage.getItem(`voice_test_data_${effectiveLang}`), "langitem-",localStorage.getItem(`${effectiveLang}`));
      setAlreadyTested(true); // Mark tested after success
      setShowTestScreen(false);
      setIsLoadingTest(false);

      playVideo();
      if(!isSpeaking)
        toggleSpeaking();

      utteranceRef.current = null;
    };
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const cancelVoiceTest = () => {
    if (utteranceRef.current) {
      speechSynthesis.pause();
      speechSynthesis.cancel();

      utteranceRef.current.onend = null;
      utteranceRef.current.onerror = null;
      utteranceRef.current.onpause = null;
      utteranceRef.current = null;
    }
    setShowTestScreen(false);
     setAlreadyTested(false);
    setIsLoadingTest(false);
    if (!isSpeaking)
      playVideo();
  };

  // Handle user changing voice from dropdown in test screen
  const onVoiceChange = (e) => {
    const selectedName = e.target.value;
    const newVoice = systemVoices.find(v => v.voiceURI === selectedName);
    setTestVoice(newVoice);
    console.log("alreadytested",alreadyTested);
    if(alreadyTested){
      localStorage.setItem(`${effectiveLang}`, newVoice.voiceURI);
      if(!isSpeaking)
        toggleSpeaking();
    }

    // On voice change, check if this voice is already tested
    const testKey = `voice_test_data_${lang}`;
    const storedData = localStorage.getItem(testKey);
    console.log("handleread - ", storedData);

    let tested = false;
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        const voiceTestData = parsed[newVoice.voiceURI];
        if (
          voiceTestData &&
          voiceTestData.voiceName === newVoice.name &&
          voiceTestData.lang === newVoice.lang
        ) {
          tested = true;
        }
      } catch {}
    }
    setAlreadyTested(tested);
  };

  // Spinner component for inline loading animation

  // Add keyframes animation for spinner
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (pauseCheckInterval.current) {
        clearInterval(pauseCheckInterval.current);
        pauseCheckInterval.current = null;
      }
    };
  }, []);

  return (
    <>
  {/* Floating Voice Controls */}
  <div className="floating-voice-controls" style={positionStyle}>
    {!showControls && (
      <button
        onClick={toggleControls}
        className="toggle-button"
        style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
        aria-label="Toggle Voice Controls"
      >
        {isSpeaking ? (
          <FaVolumeUp size={Math.floor(buttonSize * 0.5)} />
        ) : (
          <FaVolumeDown size={Math.floor(buttonSize * 0.5)} />
        )}
      </button>
    )}

    {showControls && (
      <div
        onMouseEnter={startInteraction}
        onMouseLeave={endInteraction}
        onTouchStart={startInteraction}
        onTouchEnd={endInteraction}
        className={`controls-panel ${controlsVisible ? 'visible' : 'hidden'}`}
      >
        {/* Toggle Subtitles Switch */}
        <div
          className="toggle-subtitles"
          onClick={() => handleReadSubtitlesClick(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleReadSubtitlesClick(false);
          }}
          aria-pressed={isSpeaking}
          aria-label="Toggle read subtitles"
        >
          <span>Read Subtitles</span>
          <div className={`toggle-switch ${isSpeaking ? 'active' : ''}`}>
            <div className="toggle-switch-circle" />
          </div>
        </div>

        {/* Volume Control */}
        <div className="volume-control">
          <div className="volume-label">
            <FaVolumeUp />
            <span>Volume: {volume}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            onMouseDown={() => setIsInteracting(true)}
            onMouseUp={endInteraction}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={endInteraction}
            className="volume-slider"
            aria-label="Volume control"
          />
        </div>
        {/* Change Voice Button */}
<div className="change-voice-container" style={{ marginTop: '12px' }}>
  <button
    onClick={() => handleReadSubtitlesClick(true)}
    className="voice-test-button secondary"
    aria-label="Change voice and test"
  >
    Change Voice
  </button>
</div>

      </div>
    )}
  </div>

  {/* Floating Test WPS Screen */}
   {showTestScreen && (
        <VoiceTestScreen
          voice={testVoice}
          lang={effectiveLang}
          testSentences={testSentences}
          isLoadingTest={isLoadingTest}
          startAccurateVoiceTest={startAccurateVoiceTest}
          cancelVoiceTest={cancelVoiceTest}
          onVoiceChange={onVoiceChange}
          voices={systemVoices}
          alreadyTested={tested}
        />
      )}
</>
  );
}
