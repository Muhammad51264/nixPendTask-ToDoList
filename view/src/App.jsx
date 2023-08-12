import Sidebar from './components/Sidebar'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css'
import { createContext, useContext, useState } from 'react'
import Slider from './components/Slider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Market from './components/market';


const columnsContext = createContext();

export const useColumnContext = ()=>{
  return useContext(columnsContext);
}
function App() {
const [allColumns, setAllColumns] = useState([]);
const [isLoading, setIsLoading] = useState(false);


  return (
    <columnsContext.Provider value={{allColumns,setAllColumns,isLoading, setIsLoading}}>
   <BrowserRouter>
   <Sidebar/>

   <Routes>
    <Route path='/' element={<Slider/>}></Route>
    <Route path='/marketingplan' element={<Market/>}></Route>

   </Routes>
   </BrowserRouter>
  </columnsContext.Provider>
  )
}

export default App
