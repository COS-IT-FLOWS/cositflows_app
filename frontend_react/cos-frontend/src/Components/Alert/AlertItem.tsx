import React from 'react';

interface AlertItemProps {
  type: string;
  icon: string;
  style?: React.CSSProperties;
}

const AlertItem: React.FC<AlertItemProps> = ({ type, icon }) => {
  return (
    <div className="flex gap-1.5 items-start pt-2.5 pr-20 pb-14 pl-2.5 mt-2.5 text-xs font-semibold leading-5 text-white whitespace-nowrap rounded-2xl bg-stone-300">
      <div>{type}</div>
      <img loading="lazy" src={icon} alt={`${type} alert icon`} className="shrink-0 w-6 aspect-square" />
    </div>
  );
};

export default AlertItem;