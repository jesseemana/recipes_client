import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import CreateRecipe from './components/CreateRecipe'
import ResetPwd from './components/ResetPwd'
import AuthUser from './pages/AuthUser'
import NotFound from './pages/NotFound'
import { Toaster } from 'react-hot-toast'
import Loader from './components/Loader'
import { ErrorBoundary } from 'react-error-boundary'

import { lazy, Suspense } from 'react';
import ErrorFallback from './components/ErrorFallback'
const Home = lazy(() => import('./pages/Home'))
const Recipe = lazy(() => import('./components/Recipe'))
const UserRecipes = lazy(() => import('./components/UserRecipes'))
const Profile = lazy(() => import('./components/Profile'))


function App(){ 
  const isAuth = Boolean(useSelector((state) => state.access_token))

  return (
    <>
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path='/' element={<Navigate to='/feed'/>} />
          <Route path='/auth' element={isAuth ? <Navigate to='/feed'/> : <AuthUser />} />
          <Route path='/reset' element={<ResetPwd />} />
          <Route path='/feed' element={<Suspense fallback={<Loader />}> <Home /> </Suspense>} />
          <Route path='/recipe/:id' element={<Suspense fallback={<Loader />}> <Recipe /> </Suspense>} />
          <Route path='/user/:id' element={<Suspense fallback={<Loader />}> <UserRecipes /> </Suspense>} />
          <Route path='/profile/:id' element={isAuth ? <Suspense fallback={<Loader />}> <Profile /> </Suspense> : <Navigate to='/'/>} />
          <Route path='/newrecipe' element={<CreateRecipe/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      <Toaster />
        
    </>
  )
}

export default App