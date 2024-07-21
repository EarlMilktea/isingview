const PLUS_COLOR = "#F97111";
const MINUS_COLOR = "#439CFE";
const PAD_HALF = 0.05;
const SIZE_INSIDE = 1 - 2 * PAD_HALF;
const RAD = 0.15;

interface SpinProps {
  i: number;
  j: number;
  spin: 1 | -1;
}

export default function Spin({ i, j, spin }: SpinProps) {
  return (
    <rect
      width={SIZE_INSIDE}
      height={SIZE_INSIDE}
      x={i + PAD_HALF}
      y={j + PAD_HALF}
      rx={RAD}
      ry={RAD}
      style={{
        fill: spin === 1 ? PLUS_COLOR : MINUS_COLOR,
      }}
    />
  );
}
