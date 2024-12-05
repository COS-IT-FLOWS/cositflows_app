import React from "react";

interface AlertDetailsProps {
  date: string;
  time: string;
  location: string;
  validUntil: string;
  issuedBy: string;
}

const AlertDetails: React.FC<AlertDetailsProps> = ({
  date,
  time,
  location,
  validUntil,
  issuedBy,
}) => {
  return (
    <div className="flex flex-col self-start text-xs leading-none text-white">
      <div className="flex gap-0.5 text-center">
        <div 
        className="flex items-center justify-center text-[6px] w-[35px] h-[10px] rounded-xl bg-zinc-900"
        style={{border: '0.5px solid rgba(97, 179, 255, 0.5)',}}
        >
          {date}
        </div>
        <div 
        className="flex items-center justify-center text-[6px] w-[35px] h-[10px] rounded-xl bg-zinc-900"
        style={{border: '0.5px solid rgba(97, 179, 255, 0.5)',}}
        >
          {time}
        </div>
      </div>
      <div className="text-[6px] font-inter mt-1 ml-0.5">Location: </div>
      <div className="text-[7px] mt-0.5 ml-0.5 font-inter">{location}</div>
      <div className={`text-8xs mt-1 ml-0.5`}>{validUntil}</div>
      <div 
      className="flex w-[50px] h-[10px] mt-0.5 items-center justify-center leading-none rounded-xl bg-zinc-900"
      style={{border: '0.5px solid rgba(97, 179, 255, 0.5)',}}
      >
        <span className="text-[5px]">issued by {issuedBy}</span>
      </div>
    </div>
  );
};

export default AlertDetails;