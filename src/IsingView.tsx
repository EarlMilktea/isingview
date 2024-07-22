import { useEffect, useRef, useState } from "react";
import IsingWrap from "./isingWrap.ts";
import Spins from "./Spins.tsx";
import { randSpin, SIZE_INIT } from "./utils.ts";

interface IsingViewProps {
  svgSize: number | string;
  size: number;
  k: number;
  fps: number;
}

const init = new IsingWrap(SIZE_INIT);

export default function IsingView({ svgSize, size, k, fps }: IsingViewProps) {
  const calc = useRef(init);
  const [spin, setSpin] = useState(() => randSpin(size));
  useEffect(() => {
    const hook = async () => {
      while (!(await calc.current.isReady())) {
        console.log("Waiting for Worker...");
      }
      if ((await calc.current.size()) !== size) {
        await calc.current.resize(size);
      }
      await calc.current.update(k);
      setSpin(await calc.current.spin());
    };
    const id = setInterval(hook, 1000 / fps);
    return () => {
      clearInterval(id);
    };
  }, [size, k, fps]);
  return <Spins svgSize={svgSize} spins={spin} />;
}
