import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import CreateRecipe from './components/CreateRecipe'
import ResetPwd from './components/ResetPwd'
import AuthUser from './pages/AuthUser'
import NotFound from './pages/NotFound'

import Loader from './components/Loader'

import { lazy, Suspense } from 'react'
const Home = lazy(() => import('./pages/Home'))
const Recipe = lazy(() => import('./components/Recipe'))
const UserRecipes = lazy(() => import('./components/UserRecipes'))
const Profile = lazy(() => import('./components/Profile'))


function App(){ 
  const isAuth = Boolean(useSelector((state) => state.access_token))

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={!isAuth ? <AuthUser /> : <Navigate to='feed' />} />
        <Route path='reset' element={<ResetPwd />} />
        <Route path='feed' element={isAuth ? <Suspense fallback={<Loader />}> <Home /> </Suspense> : <Navigate to='/' /> } />
        <Route path='recipe/:id' element={isAuth ? <Suspense fallback={<Loader />}> <Recipe /> </Suspense> : <Navigate to='/' /> } />
        <Route path='user/:id' element={isAuth ? <Suspense fallback={<Loader />}> <UserRecipes /> </Suspense> : <Navigate to='/' />} />
        <Route path='profile/:id' element={isAuth ? <Suspense fallback={<Loader />}> <Profile /> </Suspense> : <Navigate to='/' />} />
        <Route path='newrecipe' element={isAuth ? <CreateRecipe/> : <Navigate to='auth' /> } />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App