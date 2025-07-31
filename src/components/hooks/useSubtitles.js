// hooks/useSubtitles.js
import { useState, useEffect } from 'react';
import { getCurrentSubtitle } from '../utils/Utils';
import { use } from 'react';


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
      .then(data => setSubtitles(data))
      .catch(() => setSubtitles([]));
  }, [subtitlesUrl]);

  return getCurrentSubtitle(subtitles, currentTime, lang);
}

export function getSubtitles(subtitlesUrl ){
  const [subtitles, setSubtitles] = useState([]);

  useEffect(()=>{
     if (!subtitlesUrl) {
      setSubtitles([]);
      return;
    }
     fetch(subtitlesUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load subtitles');
        return res.json();
      })
      .then(data => setSubtitles(data))
      .catch(() => setSubtitles([]));
  }, [subtitlesUrl]);
  return subtitles;
}