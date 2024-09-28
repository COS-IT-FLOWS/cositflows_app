import React from "react";

export interface HighlightCardProps {
  title: string;
  value: string;
  unit?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  value,
  unit,
}) => {
  return (
    <article className="flex flex-col items-start px-3 py-2 font-inter  mt-2 rounded-[18px] bg-zinc-800 bg-opacity-80 border-white border-opacity-70">
      <h3 className="text-xs font-medium text-zinc-400 mb-1 mt-1 whitespace-nowrap">{title}</h3>
      <div className="flex gap-1 self-start">
        <span className="text-[24px] text-white">{value}</span>
        {unit && (
          <span className="text-xs leading-6  text-zinc-400">{unit}</span>
        )}
      </div>
    </article>
  );
};

export default HighlightCard;
