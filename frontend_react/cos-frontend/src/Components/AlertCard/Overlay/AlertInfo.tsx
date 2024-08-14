import React from "react";

interface AlertInfoProps {
  date: string;
  time: string;
  issuer: string;
}

const AlertInfo: React.FC<AlertInfoProps> = ({ date, time, issuer }) => {
  return (
    <div className="flex gap-1 items-start self-start text-xs leading-none text-center min-h-[15px]">
      <div className="flex flex-col rounded-xl w-[53px]">
        <div className="px-2.5 py-1 rounded-xl bg-neutral-400">{date}</div>
      </div>
      <div className="flex flex-col rounded-xl w-[60px]">
        <div className="px-2.5 py-1 rounded-xl bg-neutral-400">{time}</div>
      </div>
      <div className="flex flex-col text-xs leading-none rounded-xl w-[89px]">
        <div className="px-2 py-1 rounded-xl bg-neutral-400">
          issued by {issuer}
        </div>
      </div>
    </div>
  );
};

export default AlertInfo;
