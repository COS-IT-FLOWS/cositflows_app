import React from "react";
import Warning from "@mui/icons-material/Warning";

interface WarningInfoProps {
  warning: string;
  validUntil: string;
}

const WarningInfo: React.FC<WarningInfoProps> = ({ warning, validUntil }) => {
  return (
    <div className="flex flex-col items-start p-3 text-xs leading-none bg-zinc-900 text-white rounded-3xs">
      <div className="flex items-center justify-start whitespace-nowrap">
        <Warning
        sx={{
          width: '15px',
          height: '17px',
          color: 'orange',
          mr: 0.2,
          mt: 0.2,
        }}
        />
        <div className="grow mt-0.5 font-inter text-[15px]">Warning</div>
      </div>
      <div className="self-stretch mt-2 leading-[11px] text-3xs">{warning}</div>
      <div className="mt-2 text-[10px]">{validUntil}</div>
      <button className="mt-2 text-[7px] underline bg-transparent text-white opacity-90 leading-none">
        Report Missing Data
      </button>
    </div>
  );
};

export default WarningInfo;
