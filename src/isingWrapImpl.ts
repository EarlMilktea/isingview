import factory, { type IsingJS } from "./ising.js";

const reg = new FinalizationRegistry<IsingJS>((held) => {
  console.log("GC called");
  held.delete();
});

const SEED = 42;

const { IsingJS } = await factory();

export default class IsingWrapImpl {
  #ins: IsingJS;

  constructor(size: number) {
    if (!Number.isInteger(size) || size <= 0) {
      throw new Error();
    }
    this.#ins = new IsingJS(size, SEED);
    reg.register(this, this.#ins);
  }

  get size() {
    return this.#ins.size();
  }

  set size(size: number) {
    if (!Number.isInteger(size) || size <= 0) {
      throw new Error();
    }
    this.#ins.resize(size);
  }

  update(k: number) {
    this.#ins.update(k);
  }

  spin() {
    const size = this.#ins.size();
    const ret = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => 1)
    ) as (1 | -1)[][];
    const raw = this.#ins.spin();
    try {
      for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {
          const sij = raw.get(i * size + j);
          if (sij !== 1 && sij !== -1) {
            throw new Error();
          }
          ret[i][j] = sij;
        }
      }
      return ret;
    } finally {
      raw.delete();
    }
  }
}
