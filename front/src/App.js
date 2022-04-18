import { Routes, Route } from 'react-router-dom';
import './App.css';
import { About } from './components/About';
import { Home } from './components/Home';
import { Stock } from './components/Stock';
// import {SearchBar} from './components/SearchBar';
function App() {  
  
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/stock/*' element={<Stock/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
  );
}

export default App;
