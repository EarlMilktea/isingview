interface WasmModule {}

export interface CXXVector {
  size(): number;
  get(i: number): number | undefined;
  push_back(val: number): void;
  resize(size: number, val: number): void;
  set(i: number, x: number): boolean;
  delete(): void;
}

export interface IsingJS {
  spin(): CXXVector;
  resize(size: number): void;
  size(): number;
  update(k: number): void;
  magnet(): number;
  delete(): void;
}

interface EmbindModule {
  CXXVector: { new (): CXXVector };
  IsingJS: { new (size: number, seed: number): IsingJS };
}
export type MainModule = WasmModule & EmbindModule;

export default function wasmFactory(): Promise<MainModule>;
