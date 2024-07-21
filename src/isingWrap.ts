import * as Comlink from "comlink";
import { type WorkerIface } from "./utils.ts";

export default class IsingWrap {
  #wrap: Comlink.Remote<WorkerIface>;

  constructor(n: number) {
    if (!Number.isInteger(n) || n < 1) {
      throw new Error();
    }
    this.#wrap = Comlink.wrap(
      new Worker(new URL("./worker.ts", import.meta.url), {
        type: "module",
        /* @vite-ignore */
        name: String(n),
      })
    );
  }

  async size() {
    return await this.#wrap.size();
  }

  async resize(size: number) {
    await this.#wrap.resize(size);
  }

  async update(k: number) {
    await this.#wrap.update(k);
  }

  async spin() {
    return await this.#wrap.spin();
  }

  async isReady(timeout = 250) {
    const timeoutPromise = new Promise<"timeout">((resolve) => {
      setTimeout(() => {
        resolve("timeout");
      }, timeout);
    });
    const ret = await Promise.race([this.#wrap.size(), timeoutPromise]);
    if (ret !== "timeout") {
      return true;
    } else {
      return false;
    }
  }
}
