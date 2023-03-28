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
        <Route path='/auth' element={<AuthUser />} />
        <Route path='/home' element={isAuth ? <Home /> : <Navigate to='/auth' /> } />
        <Route path='/user/:id' element={isAuth ? <User /> : <Navigate to='/auth' />} />
        <Route path='/recipe/:id' element={isAuth ? <Recipe /> : <Navigate to='/auth' />} />
      </Routes>
    </>
  )
}

export default App
