import { useState, useEffect } from 'react';
import { addEndTimesToSubtitles, getCurrentSubtitle } from '../utils/Utils';

export function useSubtitles(subtitlesUrl, lang, currentTime) {
  const [subtitles, setSubtitles] = useState([]);
  console.log('useSubtitles called');
  useEffect(() => {
    if (!subtitlesUrl) {
      setSubtitles([]);
      return;
    }

    fetch(subtitlesUrl)
      .then(res => {
        if (!res.ok) {
          console.log('error in fetching subtitles');
          throw new Error('Failed to load subtitles');
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched Subtitles:', data);
        const subsWithEnd = addEndTimesToSubtitles(data);
        setSubtitles(subsWithEnd);
      })
      .catch(() => setSubtitles([]));
  }, [subtitlesUrl]);

  const currentSubtitle = getCurrentSubtitle(subtitles, currentTime, lang);
  console.log('Current Subtitle:', currentSubtitle);
  return { subtitles, currentSubtitle };
}
