import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import HistoricalData from './pages/HistoricalData';
import FutureData from './pages/FutureData';
import RainfallData from './pages/RainfallData';
import SolarData from './pages/SolarData';
import ErrorPage from './pages/ErrorPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path="/historicaldata" element={<HistoricalData />} />
          <Route path="/futuredata" element={<FutureData />} />
          <Route path="/rainfalldata" element={<RainfallData />} />
          <Route path="/solardata" element={<SolarData />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
