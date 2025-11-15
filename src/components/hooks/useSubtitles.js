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
  // 🔥 CHUNKING: GROUP SUBTITLES IN PACKS OF 6
  // -------------------------------------------------
  const chunks = useMemo(() => {
    if (!subtitles.length) return [];

    const result = [];
    const size = 6;

    for (let i = 0; i < subtitles.length; i += size) {
      const group = subtitles.slice(i, i + size);

      const combinedText = group
        .map(s => s.text?.[lang] || '') // take ONLY the language requested
        .join(' ')
        .trim();

      result.push({
        startSeconds: group[0].startSeconds,
        endSeconds: group[group.length - 1].endSeconds,
        text: combinedText,
        list: group // keep original subtitles if needed
      });
    }

    return result;
  }, [subtitles, lang]);

  // -------------------------------------------------
  // 🔥 GET CURRENT CHUNK
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
