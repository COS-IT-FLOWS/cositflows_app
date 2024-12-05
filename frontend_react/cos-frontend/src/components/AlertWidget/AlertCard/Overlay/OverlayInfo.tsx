import React from "react";

interface AlertInfoProps {
  date: string;
  time: string;
  issuer: string;
}

const AlertInfo: React.FC<AlertInfoProps> = ({ date, time, issuer }) => {
  return (
    <div className="flex gap-1 items-start self-start text-xs leading-none text-center text-white min-h-[15px]">
      <div className="flex flex-col mt-1.5 font-inter items-center justify-center rounded-xl  bg-zinc-900 w-[53px] h-[14px]"
      style={{border: '0.5px solid rgba(97, 179, 255, 0.5)',}}
      >
        <div className="text-[10px]">{date}</div>
      </div>
      <div className="flex flex-col mt-1.5 font-inter items-center justify-center rounded-xl w-[60px] h-[14px] bg-zinc-900"
      style={{border: '0.5px solid rgba(97, 179, 255, 0.5)',}}
      >
        <div className="text-[10px]">{time}</div>
      </div>
      <div className="flex flex-col mt-1.5 font-inter items-center justify-center rounded-xl  bg-zinc-900 w-[89px] h-[14px]"
      style={{border: '0.5px solid rgba(97, 179, 255, 0.5)',}}>
        <div className="text-[9px]">
          issued by {issuer}
        </div>
      </div>
    </div>
  );
};

export default AlertInfo;
