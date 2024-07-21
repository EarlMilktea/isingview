import Spin from "./Spin.jsx";

interface SpinsProps {
  svgSize: number | string;
  spins: (1 | -1)[][];
}

export default function Spins({ svgSize, spins }: SpinsProps) {
  const n = spins.length;
  const nStr = String(n);
  const buf = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      buf.push(<Spin i={i} j={j} spin={spins[i][j]} key={i * n + j} />);
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${nStr} ${nStr}`}>
      {buf}
    </svg>
  );
}
