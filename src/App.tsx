import { Routes, Route } from 'react-router-dom';
import PlanetModal from './components/Modal/PlanetModal';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/planets/:planetId" element={<PlanetModal />} />
      </Route>
    </Routes>
  );
}

export default App;
