import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Loader from './components/Loader'
import Navbar from './components/Navbar/Navbar'
import Home from './mainpages/Home'
import Recipe from './mainpages/Recipe'
import Profile from './mainpages/Profile'
import NotFound from './mainpages/NotFound'
import ResetPwd from './mainpages/ResetPwd'
import AuthUser from './mainpages/AuthUser'
import Bookmarks from './mainpages/Bookmarks'
import UserRecipes from './mainpages/UserRecipes'
import RequireAuth from './components/RequireAuth'
import CreateRecipe from './mainpages/CreateRecipe'
import ChangePassword from './mainpages/ChangePassword'

import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'
// const Home = lazy(() => import('./main pages/Home'))
// const Recipe = lazy(() => import('./mainpages/Recipe'))
// const UserRecipes = lazy(() => import('./mainpages/UserRecipes'))
// const Profile = lazy(() => import('./mainpages/Profile'))


function App(){ 
  return (
    <>
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path='/' element={<Navigate to='/feed'/>} />
          <Route path='/auth' element={<AuthUser />} />
          <Route path='/feed' element={<Home />} />
          <Route path='/recipe/:id' element={<Recipe />} />
          <Route path='/reset' element={<ResetPwd />} />
          <Route path='/reset-password/:id/:token' element={<ChangePassword />} />

          {/* PROTECTED ROUTES */}
          <Route element={<RequireAuth />}>
            <Route path='/auth' element={<Navigate to='/feed'/>} />
            <Route path='/create' element={<CreateRecipe />} />
            <Route path='/bookmarks' element={<Bookmarks />} />
            <Route path='/user/:id' element={<UserRecipes />} />
            <Route path='/profile/:id' element={<Profile />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      <Toaster />
    </>
  )
}

export default App  

{/* <Route path='/bookmarks' element={<Suspense fallback={<Loader />}> <Bookmarks /> </Suspense>} />
<Route path='/user/:id' element={<Suspense fallback={<Loader />}> <UserRecipes /> </Suspense>} />
<Route path='/profile/:id' element={<Suspense fallback={<Loader />}> <Profile /> </Suspense>} /> */}