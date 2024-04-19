
//import './App.css';
import Pay  from './pages/Pay'
import Paycard from './pages/Paycard'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pay />} />
          <Route path="/card" element={<Paycard />} />
        </Routes>
      </BrowserRouter>
    </>
    </div>
  );
}

export default App;
