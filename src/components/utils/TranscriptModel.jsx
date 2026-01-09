import { useMemo, useState } from 'react';
import styles from './TranscriptModal.module.css';

export default function TranscriptModal({ show, onClose, subtitles = [], lang }) {
  const [copied, setCopied] = useState(false);

  // ✅ Always run hooks (no conditional hooks)
const cleanSubtitles = useMemo(() => {
  if (!subtitles.length) return [];

  const last = subtitles[subtitles.length - 1];

  // 🔑 remove only if it's NOT a real subtitle
  if (!last.start) {
    return subtitles.slice(0, -1);
  }

  return subtitles;
}, [subtitles]);


  // TXT content
  const transcriptText = useMemo(() => {
    return cleanSubtitles
      .map(item => item.text?.[lang] || item.text?.en || '')
      .join('\n\n');
  }, [cleanSubtitles, lang]);

  // Convert "0:10" or "1:02" → "00:00:10,000"
  const toSrtTime = (time = '0:00') => {
    const parts = time.split(':').map(Number);
    let h = 0, m = 0, s = 0;

    if (parts.length === 3) [h, m, s] = parts;
    if (parts.length === 2) [m, s] = parts;
    if (parts.length === 1) s = parts[0];

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},000`;
  };

  // SRT content
  const srtText = useMemo(() => {
    return cleanSubtitles
      .map((item, i) => {
        const start = toSrtTime(item.start);
        const nextStart = cleanSubtitles[i + 1]?.start || item.start;
        const end = toSrtTime(nextStart);

        return `${i + 1}
${start} --> ${end}
${item.text?.[lang] || item.text?.en || ''}
`;
      })
      .join('\n');
  }, [cleanSubtitles, lang]);

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcriptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Copy failed');
    }
  };

  // ✅ Conditional render AFTER hooks
  if (!show) return null;

  return (
    <div className={styles.overlay}>
  <div className={styles.modal}>
    
    {/* Header */}
    <div className={styles.modalHeader}>
      <h2>Transcript</h2>

      <div className={styles.headerActions}>
        <button onClick={handleCopy}>
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>

        <button
          onClick={() =>
            downloadFile(transcriptText, `transcript-${lang}.txt`, 'text/plain')
          }
        >
          TXT
        </button>

        <button
          onClick={() =>
            downloadFile(srtText, `transcript-${lang}.srt`, 'application/x-subrip')
          }
        >
          SRT
        </button>

        <button
          className={styles.closeBtn}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>

    {/* Scrollable body */}
    <div className={styles.modalBody}>
      {cleanSubtitles.map((item, index) => (
        <p key={index}>
          {item.text?.[lang] || item.text?.en}
        </p>
      ))}
    </div>

  </div>
</div>

  );
}
