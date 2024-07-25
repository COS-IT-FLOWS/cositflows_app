import React from 'react';
import AlertItem from './AlertItem';
import WeatherIcon from '../../WeatherIcon';

interface AlertCardProps {
  location: string;
  alerts: Array<{
    type: string;
    icon: string;
  }>;
}

const AlertCard: React.FC<AlertCardProps> = ({ location, alerts }) => {
  return (
    <section className="flex flex-col px-4 pt-6 rounded-3xl bg-stone-900 bg-opacity-80 max-w-[231px] ml-2 mt-2">
      <h2 className="text-base font-semibold leading-6 text-white">
        Alerts in {location}
      </h2>
      {alerts.map((alert, index) => (
        <AlertItem key={index} type={alert.type} icon={alert.icon} style={{ marginTop: 20, marginLeft:20 }}/>
      ))}
      <div className="shrink-0 mt-1.5 rounded-2xl bg-stone-300 h-[90px]" />
      <WeatherIcon />
    </section>
  );
};

export default AlertCard;