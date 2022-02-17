import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogForm from './components/DogForm';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
   
      <Routes>
        <Route path= '/' element={<LandingPage />}></Route>
        <Route path= '/home' element={<Home />}></Route>
        <Route path= '/dog' element={<DogForm />}></Route>
        <Route path={`/detail/:id`} element={<Detail />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}


export default App;
