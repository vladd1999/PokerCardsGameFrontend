import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Table from './components/table';
import CreateGame from './routes/creategame';

import Home from './routes/home';
const App:FC = ()=> {
  return (
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/create" element={<CreateGame/>}/>
    <Route path="/table" element={<Table />}/>
   </Routes>
  );
}

export default App;
