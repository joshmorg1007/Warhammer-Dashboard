import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import { useEffect } from 'react';

import MainDashboard from './pages/MainDashboard';
import ArmiesDashboard from "./pages/ArmiesDashboard";
import ArmyDashboard from "./pages/ArmyDashboard";
import PlayerDashboard from "./pages/PlayerDashboard";
import MatchInput from "./pages/MatchInput";
import './App.css';


function App() {
  const htmlElement = document.querySelector('html');
  htmlElement.setAttribute('data-bs-theme', 'dark');

  useEffect(() => {
    document.title = "Warhammer Dashboard"
  }, [])

  return (
    <>
      <div className="App">

        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<MainDashboard />}></Route>
            <Route path="/users/:name" element={<PlayerDashboard />}></Route>
            <Route path="/armies" element={<ArmiesDashboard />}></Route>
            <Route path="/armies/:name" element={<ArmyDashboard />}></Route>
            <Route path="/detachments/:name" element={<MainDashboard />}></Route>
            <Route path="/Match/Input" element={<MatchInput />}></Route>
          </Routes>
        </BrowserRouter>
      </div>

    </>


  );
}

export default App;
