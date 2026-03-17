export function VoiceTypeScreen({ onSelect, onClose }) {
  return (
    <div className="voice-screen-overlay">
      <div className="voice-screen-box">
        <h2>Choose Voice Type</h2>

        <div className="voice-option">
          <h3>⚡ Device Voice</h3>
          <p>Fast and uses your phone's built-in voice.</p>
          <button onClick={() => onSelect("system")}>
            Use Device Voice
          </button>
        </div>

        <div className="voice-option">
          <h3>🎙 AI Voice</h3>
          <p>More natural voice (download required).</p>
          <button onClick={() => onSelect("piper")}>
            Use AI Voice
          </button>
        </div>

        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}