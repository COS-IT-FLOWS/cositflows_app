import React from "react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

interface IntensityCardProps {
  intensity: string;
  size?: "small" | "large";
}

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="white" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="white"
        strokeWidth={3}
      />
    </g>
  );
}

const IntensityCard: React.FC<IntensityCardProps> = ({ intensity, size= "small" }) => {
  const widthClass = size === "large" ? "w-[106px]" : "w-[75px]";
  const heightClass = size === "large" ? "h-[75px]" : "h-[50px]";
  
  return (
    <article className={`flex flex-col items-center font-inter text-white leading-none text-center ${widthClass} ${heightClass} text-neutral-600`}>
      <div className={`flex flex-col items-center py-1 bg-zinc-800 rounded-4xs ${widthClass} ${heightClass}`}>
        <GaugeContainer
        width={200}
        height={100}
        startAngle={-100}
        endAngle={110}
        value={30}
      >
        <GaugeReferenceArc />
        <GaugeValueArc 
        style={{ fill: '#DAFFEF' }}
        />
        <GaugePointer />
        </GaugeContainer>
        <p className="text-[8px] mb-1 font-inter mt-1">{intensity}</p>
      </div>
    </article>
  );
};

export default IntensityCard;