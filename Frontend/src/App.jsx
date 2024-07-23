import { useState } from 'react'
import "./index.css";

import WalletConnect from './Componets/WalletConnect';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Home from './Pages/Home';
import Signuppage from './Pages/Signuppage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<WalletConnect />} />
        <Route path="/home/:id" element={<Home/>} />
        <Route path="/signup/:id" element={<Signuppage/>} />

        </Routes>

    </Router>
    
  


    </>
  )
}

export default App
