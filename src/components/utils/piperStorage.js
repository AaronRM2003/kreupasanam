const DB_NAME = "piper_models";
const STORE = "voices";

export async function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = reject;
  });
}

export async function saveModel(key, data) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(data, key);
}

export async function loadModel(key) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readonly");
  return tx.objectStore(STORE).get(key);
}

export async function modelExists(key) {
  const model = await loadModel(key);
  return !!model;
}