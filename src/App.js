import React from 'react';
import MainPage from "./components/pages/MainPage";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/MainPage" element={<MainPage />} />
        </Routes>
    </div>
  );
}

export default App;
