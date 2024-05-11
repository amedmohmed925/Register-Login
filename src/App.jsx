
import './App.css'
import Register from './Register'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
      
    </Router>
    
  )
}

export default App
