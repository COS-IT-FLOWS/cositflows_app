import React from "react";
import WarningSign from "./WarningSign.png"

interface WarningInfoProps {
  warning: string;
  validUntil: string;
}

const WarningInfo: React.FC<WarningInfoProps> = ({ warning, validUntil }) => {
  return (
    <div className="flex flex-col items-start p-3 text-xs leading-none bg-white rounded-2xl">
      <div className="flex gap-1 whitespace-nowrap">
        <div className="grow">Warning</div>
        <img
          loading="lazy"
          src={WarningSign}
          className="object-contain shrink-0 self-start aspect-[1.1] w-[11px]"
          alt="warning symbol"
        />
      </div>
      <div className="self-stretch mt-2.5 text-xs leading-3">{warning}</div>
      <div className="mt-2 text-center">Valid till {validUntil}</div>
      <button className="mt-1.5 text-xs leading-none">
        Report Missing Data
      </button>
    </div>
  );
};

export default WarningInfo;
