/* eslint-disable no-restricted-globals */

importScripts("https://cdn.jsdelivr.net/npm/@mintplex-labs/piper-tts-web/dist/piper-tts-web.js");

let piper = null;

self.onmessage = async (e) => {

  const { type, payload } = e.data;

  try {

    if (type === "init") {

      const { modelUrl, configUrl } = payload;

      piper = await self.PiperTTS.create({
        modelUrl,
        configUrl
      });

      self.postMessage({ type: "ready" });

    }

    if (type === "synthesizeBatch") {

      if (!piper) throw new Error("Piper not initialized");

      const results = [];

      for (const item of payload.items) {

        const audio = await piper.synthesize(item.text);

        results.push({
          key: item.key,
          audio
        });

      }

      self.postMessage({
        type: "batchAudio",
        results
      });

    }

  } catch (err) {

    self.postMessage({
      type: "error",
      error: err.message
    });

  }

};