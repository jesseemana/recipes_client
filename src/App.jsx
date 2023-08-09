import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar/Navbar'
import CreateRecipe from './main pages/CreateRecipe'
import ResetPwd from './main pages/ResetPwd'
import AuthUser from './main pages/AuthUser'
import Bookmarks from './main pages/Bookmarks'
import NotFound from './main pages/NotFound'
import Loader from './components/ui/Loader'
import ChangePassword from './main pages/ChangePassword'

import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'
const Home = lazy(() => import('./main pages/Home'))
const Recipe = lazy(() => import('./main pages/Recipe'))
const UserRecipes = lazy(() => import('./main pages/UserRecipes'))
const Profile = lazy(() => import('./main pages/Profile'))


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
          <Route path='/reset-password/:id/:token' element={<ChangePassword />} />
          <Route path='/feed' element={<Suspense fallback={<Loader />}> <Home /> </Suspense>} />
          <Route path='/bookmarks' element={isAuth ? <Suspense fallback={<Loader />}> <Bookmarks /> </Suspense> : <Navigate to='/auth'/>} />
          <Route path='/recipe/:id' element={<Suspense fallback={<Loader />}> <Recipe /> </Suspense>} />
          <Route path='/user/:id' element={<Suspense fallback={<Loader />}> <UserRecipes /> </Suspense>} />
          <Route path='/profile/:id' element={isAuth ? <Suspense fallback={<Loader />}> <Profile /> </Suspense> : <Navigate to='/'/>} />
          <Route path='/newrecipe' element={<CreateRecipe/>} />
          {/* <Route path='/newrecipe' element={isAuth ? <CreateRecipe/> : <Navigate to='/auth'/>} /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      <Toaster />
    </>
  )
}

export default App