import React from "react";
import Warning from "@mui/icons-material/Warning";

interface WarningInfoProps {
  warning: string;
  validUntil: string;
}

const WarningInfo: React.FC<WarningInfoProps> = ({ warning, validUntil }) => {
  return (
    <div className="flex flex-col items-start p-3 text-xs leading-none bg-white rounded-3xs">
      <div className="flex whitespace-nowrap">
        <div className="grow mt-0.5 font-semibold text-[10px]">Warning</div>
        <Warning
        sx={{width:13,height:12}}
        />
      </div>
      <div className="self-stretch mt-2.5 text-3xs">{warning}</div>
      <div className="mt-2 text-[10px]">{validUntil}</div>
      <button className="mt-2 text-[7px] underline bg-transparent leading-none">
        Report Missing Data
      </button>
    </div>
  );
};

export default WarningInfo;
