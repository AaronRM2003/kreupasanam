import { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeDown } from 'react-icons/fa';
import { useSelectedVoice } from '../hooks/useSelectedVoice';

export default function SubtitleVoiceControls({
  isSpeaking,
  volume,
  toggleSpeaking,
  handleVolumeChange,
  playerRef, // for pausing/resuming video
  lang, // optional, used to pick voice and show language UI
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

  // Ref to track current utterance for cancellation
  const utteranceRef = useRef(null);

  // To track pause requests if player not ready yet
  const pauseCheckInterval = useRef(null);

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
  const voice = useSelectedVoice(lang);

  useEffect(() => {
    setShowControls(true);
    setControlsVisible(true);

    const timer = setTimeout(() => {
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 3000);

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
  const handleReadSubtitlesClick = () => {
    if (!('speechSynthesis' in window)) {
    alert("Text-to-Speech is not supported by your browser/device.");
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    alert("Voices are still loading, please wait a moment and try again.");
    return;
  }

  if (!voice) {
    alert("No suitable voice found for your language. Please check your device's Text-to-Speech settings.");
    return;
  }

  // Check if voice from hook is really available in system voices (edge case)
  const voiceAvailable = voices.some(v => v.name === voice.name);
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

    const testKey = `voice_${voice?.name}_tested`;
    const alreadyTested = localStorage.getItem(testKey);

    if (!alreadyTested) {
      setShowTestScreen(true);
      pauseVideo();
      return;
    }

    toggleSpeaking();
  };

  // Start the voice test reading and measure speed
  const startAccurateVoiceTest = () => {
    if (!voice) return;

    setIsLoadingTest(true);

    const sentence = testSentences[lang] || "This is a quick test to ensure subtitles are read correctly in your selected voice.";
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.voice = voice;
    utterance.lang = lang;

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
      // Treat pause as cancellation — hide UI and reset state
      setIsLoadingTest(false);
      setShowTestScreen(false);
      playVideo();
      utteranceRef.current = null;
    };

    utterance.onend = () => {
      if (!utteranceRef.current) return; // Cancelled, ignore onend

      const speechEndTime = performance.now();
      const elapsedSeconds = (speechEndTime - speechStartTime) / 1000;
      const wordCount = sentence.trim().split(/\s+/).length;
      const wps = wordCount / elapsedSeconds;

      console.log(`Accurate WPS for "${voice.name}": ${wps.toFixed(2)} (time=${elapsedSeconds.toFixed(2)}s)`);

      localStorage.setItem(`voice_${voice.name}_tested`, wps.toFixed(2));
      localStorage.setItem(`${lang}`, `${voice.voiceURI}`);

      setShowTestScreen(false);
      setIsLoadingTest(false);

      playVideo();
      toggleSpeaking();

      utteranceRef.current = null;
    };

    speechSynthesis.cancel(); // Cancel any ongoing speech before starting new
    speechSynthesis.speak(utterance);
  };

  // Cancel voice test: stop speech, hide test UI, resume video
  const cancelVoiceTest = () => {
    if (utteranceRef.current) {
      speechSynthesis.pause();
      speechSynthesis.cancel();

      // Remove handlers so no onend fires after cancel
      utteranceRef.current.onend = null;
      utteranceRef.current.onerror = null;
      utteranceRef.current.onpause = null;
      utteranceRef.current = null;
    }
    setShowTestScreen(false);
    setIsLoadingTest(false);
    playVideo();
  };

  // Spinner component for inline loading animation
  const Spinner = () => (
    <span
      style={{
        width: '18px',
        height: '18px',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        borderTop: '3px solid #fff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        display: 'inline-block',
        marginRight: '8px',
      }}
    />
  );

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
      <div
        style={{
          position: 'fixed',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ...positionStyle,
        }}
      >
        {!showControls && (
          <button
            onClick={toggleControls}
            style={{
              width: `${buttonSize}px`,
              height: `${buttonSize}px`,
              background: '#222',
              borderRadius: '50%',
              border: 'none',
              color: '#00f2fe',
              boxShadow: '0 0 10px #00f2feaa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
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
            style={{
              marginTop: '10px',
              background: 'rgba(20,20,20,0.95)',
              padding: '14px 18px',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backdropFilter: 'blur(6px)',
              opacity: controlsVisible ? 1 : 0,
              visibility: controlsVisible ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, visibility 0.3s ease',
              boxShadow: '0 0 15px #00f2fe88',
            }}
          >
            {/* Toggle Subtitles Switch */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '18px',
                cursor: 'pointer',
                userSelect: 'none',
                color: '#fff',
                fontSize: '0.95rem',
              }}
              onClick={handleReadSubtitlesClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleReadSubtitlesClick();
              }}
              aria-pressed={isSpeaking}
              aria-label="Toggle read subtitles"
            >
              <span>Read Subtitles</span>
              <div
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '24px',
                  backgroundColor: isSpeaking ? '#007BFF' : '#ccc',
                  position: 'relative',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: isSpeaking ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}
                />
              </div>
            </div>

            {/* Volume Control */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                color: '#fff',
                fontSize: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                style={{
                  width: '140px',
                  accentColor: '#007BFF',
                  borderRadius: '4px',
                  height: '16px',
                }}
                aria-label="Volume control"
              />
            </div>
          </div>
        )}
      </div>

      {/* Floating Test WPS Screen */}
      {showTestScreen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            padding: '20px',
            textAlign: 'center',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="voice-test-title"
        >
          <h2 id="voice-test-title" style={{ marginBottom: '16px' }}>
            Voice Test: {voice?.name || 'Default'}
          </h2>
          {lang && <p style={{ marginBottom: '8px' }}>Language: {lang.toUpperCase()}</p>}
          <p style={{ maxWidth: '500px', marginBottom: '24px' }}>
            {testSentences[lang] ||
              'This is a quick test to ensure subtitles are read correctly in your selected voice.'}
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={startAccurateVoiceTest}
              style={{
                padding: '10px 20px',
                background: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoadingTest ? 'default' : 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '140px',
                opacity: isLoadingTest ? 0.8 : 1,
              }}
              aria-label="Start voice test reading"
              disabled={isLoadingTest}
            >
              {isLoadingTest ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                'Start Reading'
              )}
            </button>

            <button
              onClick={cancelVoiceTest}
              style={{
                padding: '10px 20px',
                background: '#444',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoadingTest ? 'default' : 'pointer',
                fontSize: '1rem',
              }}
              aria-label="Cancel voice test"
              disabled={isLoadingTest}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
