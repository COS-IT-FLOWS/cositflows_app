import React from 'react';

interface IconProps {
  src: string;
  alt: string;
}

const NavComponent: React.FC<IconProps> = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="object-contain w-14 aspect-[1.08] mt-5" />
);

export default NavComponent;