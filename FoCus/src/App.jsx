import { useState } from 'react'
import './App.css'
import {createRoutesFromElements, RouterProvider} from "react-router-dom"
import { AppShell } from './components/AppShell/AppShell'
import { HomePage } from './Pages/HomePage/HomePage'
import { NewTask } from './Pages/NewTask/NewTask'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { QA } from './Pages/QA/QA'


function App() {
  const [count, setCount] = useState(0);
  console.log('App is rendering!');


  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomePage />}/>
          <Route path="addNewTask" element={<NewTask/>}/>
          <Route path="QA" element={<QA/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App
