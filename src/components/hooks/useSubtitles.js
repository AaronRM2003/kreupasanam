import { useState, useEffect } from 'react';
import { addEndTimesToSubtitles, buildChunks, getCurrentChunk, getCurrentSubtitle, timeStringToSeconds } from '../utils/Utils';

export function useSubtitles(subtitlesUrl, lang, currentTime) {
  const [subtitles, setSubtitles] = useState([]);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    if (!subtitlesUrl) {
      setSubtitles([]);
      setChunks([]);
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

        // Build chunks immediately after loading subtitles
        const grouped = buildChunks(subsWithEnd, lang);
        setChunks(grouped);
      })
      .catch(() => {
        setSubtitles([]);
        setChunks([]);
      });
  }, [subtitlesUrl, lang]);

  const currentSubtitle = getCurrentSubtitle(subtitles, currentTime, lang);
  const currentChunk = getCurrentChunk(chunks, currentTime);

  return { subtitles, currentSubtitle, currentChunk };
}