// App.tsx
import { Routes, Route } from 'react-router-dom';
import MonitorScreen from './components/Screens/MonitorScreen';
import ForecastScreen from './components/Screens/ForecastScreen';
import ImpactScreen from './components/Screens/ImpactScreen';
import AboutScreen from './components/Screens/AboutScreen';
import SettingScreen from './components/Screens/SettingScreen';

const App: React.FC = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<MonitorScreen />} />
            <Route path='/monitor' element={<MonitorScreen />} />
            <Route path="/impact" element={<ImpactScreen />} />
            <Route path="/forecast" element={<ForecastScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/settings" element={<SettingScreen />} />

         </Routes>
      </>
   );
};

export default App;