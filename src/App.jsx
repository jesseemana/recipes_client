import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import AuthUser from './pages/AuthUser'
import Home from './pages/Home'
import Recipe from './components/Recipe'
import User from './components/User'
import CreateRecipe from './components/CreateRecipe';
import NotFound from './pages/NotFound';
import ResetPwd from './pages/ResetPwd';


function App(){ 
  const isAuth = Boolean(useSelector((state) => state.access_token))

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/auth' element={<AuthUser />} />
        <Route path='/reset' element={<ResetPwd />} />
        <Route path='/' element={isAuth ? <Home /> : <Navigate to='/auth' /> } />
        <Route path='/newrecipe' element={isAuth ? <CreateRecipe/> : <Navigate to='/auth' /> } />
        <Route path='/user/:id' element={isAuth ? <User /> : <Navigate to='/auth' />} />
        <Route path='/recipe/:id' element={isAuth ? <Recipe /> : <Navigate to='/auth' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App