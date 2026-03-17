import React, { useState, useEffect } from "react";
import { saveModel, modelExists } from "./piperStorage";

export default function PiperVoiceManager({
  lang,
  onClose,
  onVoiceSelected
}) {

  const [voices, setVoices] = useState([]);
  const [installedVoices, setInstalledVoices] = useState({});
  const [selected, setSelected] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [progress, setProgress] = useState(0);

  // -------------------------
  // Load available voices
  // -------------------------

  useEffect(() => {

    const available = {

      en: [
        {
          id: "en_US-amy-medium",
          name: "Natural Female",
          model:
            "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/amy/medium/en_US-amy-medium.onnx",
          config:
            "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/amy/medium/en_US-amy-medium.onnx.json",
          size: "60MB"
        },
        {
          id: "en_US-lessac-medium",
          name: "Male Voice",
          model:
            "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx",
          config:
            "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx.json",
          size: "60MB"
        }
      ]

    };

    async function loadVoices() {

      const list = available[lang] || [];

      const installed = {};

      for (const v of list) {
        const exists = await modelExists(`${v.id}_model`);
        installed[v.id] = exists;
      }

      setInstalledVoices(installed);
      setVoices(list);

      const saved = localStorage.getItem(`piper_selected_${lang}`);
      if (saved) setSelected(saved);

    }

    loadVoices();

  }, [lang]);

  // -------------------------
  // Download voice
  // -------------------------

  async function downloadVoice(voice) {

    try {

      setDownloading(voice.id);
      setProgress(0);

      const modelResponse = await fetch(voice.model);
      const configResponse = await fetch(voice.config);

      const modelBlob = await modelResponse.blob();
      setProgress(50);

      const configBlob = await configResponse.blob();
      setProgress(80);

      await saveModel(`${voice.id}_model`, modelBlob);
      await saveModel(`${voice.id}_config`, configBlob);

      setInstalledVoices(prev => ({
        ...prev,
        [voice.id]: true
      }));

      setProgress(100);

    } catch (err) {

      console.error("Download failed", err);
      alert("Voice download failed.");

    }

    setDownloading(null);

  }

  // -------------------------
  // Confirm selection
  // -------------------------

  function confirmVoice() {

    if (!selected) return;

    onVoiceSelected(selected);

  }

  // -------------------------
  // UI
  // -------------------------

  return (

    <div className="voice-screen-overlay">

      <div className="voice-screen-box">

        <h2>AI Voices</h2>

        {voices.map(v => (

          <div key={v.id} className="voice-item">

            <div
              className="voice-info"
              onClick={() => installedVoices[v.id] && setSelected(v.id)}
              style={{
                cursor: installedVoices[v.id] ? "pointer" : "default",
                opacity: installedVoices[v.id] ? 1 : 0.6
              }}
            >

              <b>{v.name}</b>

              <span>{v.size}</span>

              {installedVoices[v.id] && (
                <span className="voice-status">

                  {selected === v.id
                    ? "✓ Selected"
                    : "Installed"}

                </span>
              )}

            </div>

            {!installedVoices[v.id] && (

              downloading === v.id ? (

                <div>
                  Downloading {progress}%
                </div>

              ) : (

                <button
                  onClick={() => downloadVoice(v)}
                >
                  Download
                </button>

              )

            )}

          </div>

        ))}

        <div className="voice-actions">

          <button onClick={onClose}>
            Cancel
          </button>

          <button
            disabled={!selected}
            onClick={confirmVoice}
          >
            Use Voice
          </button>

        </div>

      </div>

    </div>

  );

}