import React from 'react';

const AboutScreen: React.FC = () => {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-inter mb-4">About</h1>
      <p className="text-lg font-inter mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
      </p>
      <p className="text-lg font-inter mb-6">
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </p>
      <h2 className="text-2xl font-inter mb-4">Our Mission</h2>
      <p className="text-lg mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
      </p>
      <h2 className="text-2xl font-inter mb-4">Our Team</h2>
      <ul className="list-none mb-6">
        <li className="mb-4">
          <img src="https://via.placeholder.com/50" alt="Team Member 1" className="w-12 h-12 rounded-full mr-4" />
          <span className="text-lg font-inter">John Doe</span>
          <p className="text-sm">Founder & CEO</p>
        </li>
        <li className="mb-4">
          <img src="https://via.placeholder.com/50" alt="Team Member 2" className="w-12 h-12 rounded-full mr-4" />
          <span className="text-lg font-inter ">Jane Doe</span>
          <p className="text-sm">CTO</p>
        </li>
      </ul>
    </div>
  );
};

export default AboutScreen;