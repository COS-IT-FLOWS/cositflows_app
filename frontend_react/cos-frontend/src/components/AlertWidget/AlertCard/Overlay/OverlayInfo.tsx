import React from "react";

interface AlertInfoProps {
  date: string;
  time: string;
  issuer: string;
}

const AlertInfo: React.FC<AlertInfoProps> = ({ date, time, issuer }) => {
  return (
    <div className="flex gap-1 items-start self-start text-xs leading-none text-center min-h-[15px]">
      <div className="flex flex-col mt-1.5 font-semibold items-center justify-center rounded-xl  bg-neutral-400 w-[53px] h-[14px]">
        <div className="text-[10px]">{date}</div>
      </div>
      <div className="flex flex-col mt-1.5 font-semibold items-center justify-center rounded-xl w-[60px] h-[14px] bg-neutral-400">
        <div className="text-[10px]">{time}</div>
      </div>
      <div className="flex flex-col mt-1.5 font-semibold items-center justify-center rounded-xl  bg-neutral-400 w-[89px] h-[14px]">
        <div className="text-[9px]">
          issued by {issuer}
        </div>
      </div>
    </div>
  );
};

export default AlertInfo;
