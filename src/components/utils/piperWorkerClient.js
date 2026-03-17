let worker = null;

export function getWorker() {

  if (!worker) {

    worker = new Worker(
      new URL("./piperWorker.js", import.meta.url),

      { type: "module" }
    );

  }

  return worker;

}