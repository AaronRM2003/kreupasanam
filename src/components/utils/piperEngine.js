import { loadModel } from "./piperStorage";
import { getWorker } from "./piperWorkerClient";

let worker = null;

export async function loadPiperVoice(voiceId) {

  const modelBlob = await loadModel(`${voiceId}_model`);
  const configBlob = await loadModel(`${voiceId}_config`);

  const modelUrl = URL.createObjectURL(modelBlob);
  const configUrl = URL.createObjectURL(configBlob);

  worker = getWorker();

  return new Promise((resolve) => {

    worker.onmessage = (e) => {

      if (e.data.type === "ready") {
        resolve();
      }

    };

    worker.postMessage({
      type: "init",
      payload: { modelUrl, configUrl }
    });

  });

}

export function generateBatch(items) {

  return new Promise((resolve, reject) => {

    worker.postMessage({
      type: "synthesizeBatch",
      payload: { items }
    });

    worker.onmessage = (e) => {

      if (e.data.type === "batchAudio") {

        resolve(e.data.results);

      }

      if (e.data.type === "error") {

        reject(e.data.error);

      }

    };

  });

}