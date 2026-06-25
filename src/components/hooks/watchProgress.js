export function saveWatchProgress(id, currentTime, duration) {
  if (!id || !duration) return;

  localStorage.setItem(
    `watch_progress_${id}`,
    JSON.stringify({
      currentTime,
      duration,
      updatedAt: Date.now(),
    })
  );
}

export function getWatchProgress(id) {
  const raw = localStorage.getItem(`watch_progress_${id}`);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function removeWatchProgress(id) {
  localStorage.removeItem(`watch_progress_${id}`);
}