import { useState, useEffect } from 'react';
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

  return { subtitles, currentSubtitle };
}
