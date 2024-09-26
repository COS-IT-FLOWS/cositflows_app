// App.tsx
import { Routes, Route } from 'react-router-dom';
import MonitorScreen from './components/Screens/MonitorScreen';
import ForecastScreen from './components/Screens/ForecastScreen';
import ImpactScreen from './components/Screens/ImpactScreen';
//import AboutScreen from './components/Screens/AboutScreen';
//import SettingScreen from './components/Screens/SettingScreen';
import MainLayout from './MainLayout';

const App: React.FC = () => {
   return (
         <Routes>
            <Route path="/" element={<MainLayout />} >
               <Route path="monitor" element={<MonitorScreen/>} />
               <Route path="forecast" element={<ForecastScreen/>} />
               <Route path="impact" element={<ImpactScreen/>} />
               {/* <Route index element = {<MonitorScreen />} /> */}
               {/* <Route path='/monitor' element={<MonitorScreen />} />
               <Route path="/impact" element={<ImpactScreen />} />
               <Route path="/forecast" element={<ForecastScreen />} /> */}
               {/*<Route path="/about" element={<AboutScreen />} />
               <Route path="/settings" element={<SettingScreen />} /> */}
            </Route>
         </Routes>
   );
};

export default App;