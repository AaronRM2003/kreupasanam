export function saveWatchProgress(videoId, currentTime, duration) {
  if (!videoId || !duration) return;

  localStorage.setItem(
    `watch_progress_${videoId}`,
    JSON.stringify({
      currentTime,
      duration,
      updatedAt: Date.now(),
    })
  );
}

export function getWatchProgress(videoId) {
  if (!videoId) return null;

  const raw = localStorage.getItem(`watch_progress_${videoId}`);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function removeWatchProgress(videoId) {
  if (!videoId) return;

  localStorage.removeItem(`watch_progress_${videoId}`);
}