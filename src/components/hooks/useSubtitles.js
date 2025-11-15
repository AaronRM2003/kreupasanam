import { useState, useEffect, useMemo } from 'react';
import { addEndTimesToSubtitles, getCurrentSubtitle } from '../utils/Utils';

export function useSubtitles(subtitlesUrl, lang, currentTime) {
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    if (!subtitlesUrl) {
      setSubtitles([]);
      return;
    }

    fetch(subtitlesUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load subtitles');
        return res.json();
      })
      .then(data => {
        const subsWithEnd = addEndTimesToSubtitles(data);
        setSubtitles(subsWithEnd);
      })
      .catch(() => setSubtitles([]));
  }, [subtitlesUrl]);

  const currentSubtitle = getCurrentSubtitle(subtitles, currentTime, lang);

  // -------------------------------------------------
  // 🔥 MULTI-LANGUAGE CHUNKING (OPTION A)
  // -------------------------------------------------
  const chunks = useMemo(() => {
    if (!subtitles.length) return [];

    const grouped = [];
    const size = 6;

    for (let i = 0; i < subtitles.length; i += size) {
      const group = subtitles.slice(i, i + size);

      // Build full multi-language_text
      const languages = Object.keys(group[0].text || {});

      const combinedTextObject = {};

      languages.forEach(l => {
        combinedTextObject[l] = group
          .map(s => s.text?.[l] || "")
          .join(" ")
          .trim();
      });

      const startSeconds = group[0].startSeconds;
      const endSeconds = group[group.length - 1].endSeconds;
      const duration = endSeconds - startSeconds;

      grouped.push({
        startSeconds,
        endSeconds,
        duration,
        text: combinedTextObject,   // 🔥 same structure as subtitle.text
      });
    }

    return grouped;
  }, [subtitles]);

  // -------------------------------------------------
  // 🔥 CURRENT CHUNK IDENTIFICATION
  // -------------------------------------------------
  const currentChunk = useMemo(() => {
    return chunks.find(
      c => currentTime >= c.startSeconds && currentTime < c.endSeconds
    );
  }, [chunks, currentTime]);

  return {
    subtitles,
    currentSubtitle,
    currentChunk
  };
}
