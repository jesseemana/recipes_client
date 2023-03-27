import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import AuthUser from './pages/AuthUser'
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import User from './pages/User'


function App(){ 
  const isAuth = Boolean(useSelector((state) => state.access_token))

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<AuthUser />} />
        <Route path='/home' element={isAuth ? <Home /> : <Navigate to='/' /> } />
        <Route path='/user/:id' element={isAuth ? <User /> : <Navigate to='/' />} />
        <Route path='/recipe/:id' element={isAuth ? <Recipe /> : <Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default App
