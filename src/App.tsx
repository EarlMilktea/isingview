import { type ChangeEventHandler, useState } from "react";
import { tw } from "twind";
import reactLogo from "./assets/react.svg";
import wasmLogo from "./assets/wasm.svg";
import IsingView from "./IsingView.tsx";
import { FPS_INIT, K_INIT, SIZE_INIT } from "./utils.ts";

interface SizeRangeProps {
  size: number;
  hook: ChangeEventHandler<HTMLInputElement>;
}

interface KRangeProps {
  k: number;
  hook: ChangeEventHandler<HTMLInputElement>;
}

interface FPSRangeProps {
  fps: number;
  hook: ChangeEventHandler<HTMLInputElement>;
}

function SizeRange({ size, hook }: SizeRangeProps) {
  return (
    <div className={tw`flex`}>
      <label htmlFor="L" className={tw`w-2/12 block`}>
        L
      </label>
      <input
        type="range"
        min="2"
        max="128"
        step="1"
        value={size}
        className={tw`w-8/12 bg-[#439CFE]`}
        id="L"
        onChange={hook}
      />
      <div className={tw`w-2/12 text-right`}>{size}</div>
    </div>
  );
}

function KRange({ k, hook }: KRangeProps) {
  return (
    <div className={tw`flex`}>
      <label htmlFor="k" className={tw`w-2/12 block`}>
        βJ
      </label>
      <input
        type="range"
        min="-1"
        max="1"
        step="any"
        value={k}
        className={tw`w-8/12`}
        id="k"
        onChange={hook}
      />
      <div className={tw`w-2/12 text-right`}>{k.toFixed(3)}</div>
    </div>
  );
}

function FPSRange({ fps, hook }: FPSRangeProps) {
  return (
    <div className={tw`flex`}>
      <label htmlFor="fps" className={tw`w-2/12 block`}>
        FPS
      </label>
      <input
        type="range"
        min="1"
        max="300"
        step="1"
        value={fps}
        className={tw`w-8/12`}
        id="fps"
        onChange={hook}
      />
      <div className={tw`w-2/12 text-right`}>{fps}</div>
    </div>
  );
}

export default function App() {
  const [size, setSize] = useState(SIZE_INIT);
  const [k, setK] = useState(K_INIT);
  const [fps, setFps] = useState(FPS_INIT);
  return (
    <div className={tw`w-10/12 mx-auto my-12`}>
      <h1 className={tw`text-2xl font-bold my-4 lg:hidden`}>
        MCMC: 2D Ising Model
      </h1>

      <div className={tw`md:flex justify-between`}>
        <div className={tw`md:w-5/12`}>
          <IsingView svgSize={"100%"} size={size} k={k} fps={fps} />
        </div>

        <div className={tw`md:w-1/2 flex flex-col justify-between`}>
          <h1 className={tw`text-2xl font-bold hidden lg:block`}>
            MCMC: 2D Ising Model
          </h1>

          <div className={tw`hidden md:block`}>
            <div className={tw`flex justify-evenly`}>
              <img src={wasmLogo} id="wasm-logo" className={tw`w-3/12`}></img>
              <img src={reactLogo} id="react-logo" className={tw`w-3/12`}></img>
            </div>
            <h2 className={tw`text-center text-xl mt-2 hidden lg:block`}>
              WebAssembly + React
            </h2>
          </div>

          <div>
            <SizeRange
              size={size}
              hook={(e) => {
                const v = Number.parseInt(e.target.value);
                setSize(v);
              }}
            />

            <KRange
              k={k}
              hook={(e) => {
                const v = Number.parseFloat(e.target.value);
                setK(v);
              }}
            />

            <FPSRange
              fps={fps}
              hook={(e) => {
                const v = Number.parseInt(e.target.value);
                setFps(v);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}