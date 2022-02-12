import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogForm from './components/DogForm';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path= '/' element={<LandingPage />}></Route>
        <Route path= '/home' element={<Home />}></Route>
        <Route path= '/dog' element={<DogForm />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}


export default App;
