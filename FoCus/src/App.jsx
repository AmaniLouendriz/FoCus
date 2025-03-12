import { useState } from 'react'
import './App.css'
import {createRoutesFromElements, RouterProvider} from "react-router-dom"
import { AppShell } from './components/AppShell/AppShell'
import { HomePage } from './Pages/HomePage/HomePage'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0);
  console.log('App is rendering!');


  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<AppShell/>}>
  //       <Route index element={<HomePage/>}/>
  //     </Route>
  //   )
  // )
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomePage />}/>
        </Route>
      </Routes>
    </Router>
  );

  // (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

  // return <RouterProvider router={router}/>
}

export default App
