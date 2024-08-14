import React from "react";
import lightning_icon from "../lightning_icon.svg"

interface AlertHeaderProps {
  alertType: string;
}

const AlertHeader: React.FC<AlertHeaderProps> = ({alertType}) => {
  return (
    <header className="flex gap-5 justify-between w-full text-xl leading-none text-neutral-700">
      <div className="flex gap-1.5">
        <h1 className="grow my-auto">{alertType}</h1>
        <img
          loading="lazy"
          src={lightning_icon}
          className="object-contain shrink-0 aspect-square w-[30px]"
          alt=""
        />
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/171a25e2644355f29cc1ad01d01fa78d0e9fc700e6f7cad2a8b0827185780fcb?placeholderIfAbsent=true&apiKey=064c7d1bc1bd4d4dbf906d36b5699d98"
        className="object-contain shrink-0 self-start mt-1 aspect-[3.1] w-[31px]"
        alt=""
      />
    </header>
  );
};

export default AlertHeader;
