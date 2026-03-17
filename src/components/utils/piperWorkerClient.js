let worker = null;

export function getWorker() {

  if (!worker) {

    worker = new Worker(
      new URL("../../workers/piperWorker.js", import.meta.url)
    );

  }

  return worker;

}