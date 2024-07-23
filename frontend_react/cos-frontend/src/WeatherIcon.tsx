import React from 'react';

const WeatherIcon: React.FC = () => {
  return (
    <div className="flex z-10 flex-col items-center px-16 pt-14 pb-4 mt-1.5 rounded-2xl">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/899b01c4b7eafe4bdcc3e15b79865f933789601715da72e431af17fe6cab2bf6?apiKey=064c7d1bc1bd4d4dbf906d36b5699d98&" alt="" className="aspect-[1.61] fill-stone-300 w-[29px]" />
    </div>
  );
};

export default WeatherIcon;