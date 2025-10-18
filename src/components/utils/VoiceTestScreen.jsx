import React, { useState, useEffect } from 'react';

const Spinner = () => (
  <span
    style={{
      width: '20px',
      height: '20px',
      border: '3px solid rgba(0, 123, 255, 0.3)',
      borderTop: '3px solid #fefefeff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      display: 'inline-block',
      marginRight: '10px',
      verticalAlign: 'middle',
    }}
    aria-hidden="true"
  />
);

const styleSheet = `
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
`;

export default function VoiceTestScreen({
  voice,
  voices = [],
  lang,
  testSentences = {},
  isLoadingTest,
  startAccurateVoiceTest,
  cancelVoiceTest,
  onVoiceChange,
  alreadyTested,
}) {
  const [tempVoice, setTempVoice] = useState(voice?.voiceURI || '');
  const [previousVoice, setPreviousVoice] = useState(voice?.voiceURI || '');

  useEffect(() => {
    // Update both when parent voice changes
    setTempVoice(voice?.voiceURI || '');
    setPreviousVoice(voice?.voiceURI || '');
  }, [voice]);

  const testSentence =
    testSentences[lang] ||
    'This is a quick test to ensure subtitles are read correctly in your selected voice.';

  const handleSelectChange = (e) => {
    setTempVoice(e.target.value);
    onVoiceChange(e);
  };

  const handleCancel = () => {
    // Revert to previous selection
    setTempVoice(previousVoice);
    onVoiceChange({ target: { value: previousVoice } });
    cancelVoiceTest();
  };

  return (
    <>
      <style>{styleSheet}</style>
      <div
        className="voice-test-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-test-title"
      >
        <h2 id="voice-test-title" className="voice-test-title">
          Voice Test: {voice?.name || 'Default'}
        </h2>

        {lang && <p className="voice-test-lang">Language: {lang.toUpperCase()}</p>}

        <label htmlFor="voice-select" className="voice-test-label">
          Select voice:
        </label>
        <select
          id="voice-select"
          value={tempVoice}
          onChange={handleSelectChange}
          aria-label="Select voice for testing"
          className="voice-test-select"
          disabled={isLoadingTest}
        >
          {voices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>

        {!alreadyTested ? (
          <>
            <p className="voice-test-text">{testSentence}</p>

            <div className="voice-test-buttons">
              <button
                onClick={startAccurateVoiceTest}
                className="voice-test-button primary"
                aria-label="Start voice test reading"
                disabled={isLoadingTest}
                aria-busy={isLoadingTest}
              >
                {isLoadingTest ? (
                  <>
                    <Spinner />
                    Testing...
                  </>
                ) : (
                  'Start Reading'
                )}
              </button>

              <button
                onClick={handleCancel}
                className="voice-test-button cancel"
                aria-label="Cancel voice test"
                disabled={isLoadingTest}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="voice-test-buttons">
            <button
              onClick={() => {
                onVoiceChange({ target: { value: voice.voiceURI } });
                cancelVoiceTest();
              }}
              className="voice-test-button primary"
              autoFocus
              aria-label="Close voice test"
            >
              OK
            </button>
          </div>
        )}

        <p
          style={{
            marginTop: '24px',
            fontSize: '0.85rem',
            color: '#666',
            fontStyle: 'italic',
          }}
          role="note"
        >
          Note: On some devices, like newer Android phones, changing the voice may not actually affect the spoken output.
        </p>
      </div>
    </>
  );
}
