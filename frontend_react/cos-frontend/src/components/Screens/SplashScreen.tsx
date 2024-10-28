// import React from 'react';
// import Lottie from 'react-lottie';
// import animationData from './animation2.json';

// interface SplashScreenProps {
//   onLaunch: () => void;
// }

// const SplashScreen: React.FC<SplashScreenProps> = ({ onLaunch }) => {
//     const defaultOptions = {
//         loop: true, // Lottie animation will loop until launch is clicked
//         autoplay: true,
//         animationData: animationData, // The imported Lottie animation data
//         rendererSettings: {
//             preserveAspectRatio: "xMidYMid slice",
//         },
//         };

//   return (
//     <div className="flex flex-col items-center justify-center font-inter h-screen bg-zinc-900 text-white">
//       <Lottie 
//         options={defaultOptions} 
//         height={300} 
//         width={300} // Adjust the height and width as per your needs
//       />
//       <h1 className="text-[60px] text-white font-medium basis-auto mb-8">Insight Gather</h1>
//       <button
//         onClick={onLaunch}
//         className="bg-teal-100 text-white text-[28px] px-6 py-3 rounded-lg hover:bg-teal-500 transition duration-500"
//       >
//         LAUNCH
//       </button>
//     </div>
//   );
// };

export {};