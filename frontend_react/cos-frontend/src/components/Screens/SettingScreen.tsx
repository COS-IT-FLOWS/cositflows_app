import React from 'react';

const SettingScreen: React.FC = () => {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
          <ul className="list-none mb-6">
            <li className="mb-4">
              <p className="text-lg">Name: John Doe</p>
              <button className="text-sm font-semibold underline">Change</button>
            </li>
            <li className="mb-4">
              <p className="text-lg">Email: john.doe@example.com</p>
              <button className="text-sm font-semibold underline">Change</button>
            </li>
            <li className="mb-4">
              <p className="text-lg">Password: ******</p>
              <button className="text-sm font-semibold underline">Change</button>
            </li>
          </ul>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Preferences</h2>
          <ul className="list-none mb-6">
            <li className="mb-4">
              <p className="text-lg">Language: English</p>
              <button className="text-sm font-semibold underline">Change</button>
            </li>
            <li className="mb-4">
              <p className="text-lg">Time Zone: UTC-5</p>
              <button className="text-sm font-semibold underline">Change</button>
            </li>
            <li className="mb-4">
              <p className="text-lg">Notifications: On</p>
              <button className="text-sm font-semibold underline">Change</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingScreen;