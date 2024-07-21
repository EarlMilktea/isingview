import * as Comlink from "comlink";
import IsingWrapImpl from "./isingWrapImpl.ts";
import { type WorkerIface } from "./utils.ts";

const n = Number.parseInt(self.name);

const calc = new IsingWrapImpl(n);

const obj: WorkerIface = {
  size() {
    return calc.size;
  },
  resize(size: number) {
    calc.size = size;
  },
  update(k: number) {
    calc.update(k);
  },
  spin() {
    return calc.spin();
  },
};

Comlink.expose(obj);
