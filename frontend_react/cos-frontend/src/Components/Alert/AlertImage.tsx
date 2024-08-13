import React from "react";

interface AlertImageProps {
  imageSrc: string;
}

const AlertImage: React.FC<AlertImageProps> = ({ imageSrc }) => {
  return (
    <img
      loading="lazy"
      src={imageSrc}
      alt="Alert visual representation"
      className="object-contain rounded-lg aspect-[1.37] w-[70px]"
    />
  );
};

export default AlertImage;
