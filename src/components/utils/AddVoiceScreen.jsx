function AddVoiceScreen({ voices, onDownload, onClose }) {
  return (
    <div className="voice-screen-overlay">
      <div className="voice-screen-box">

        <h2>Add Voice</h2>

        {voices.map(v => (
          <div key={v.id} className="voice-download">

            <div>
              <b>{v.name}</b>
              <span>{v.size}</span>
            </div>

            <button onClick={() => onDownload(v)}>
              Download
            </button>

          </div>
        ))}

        <button onClick={onClose}>Cancel</button>

      </div>
    </div>
  );
}