import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './mainpages/Home'
import Recipe from './mainpages/Recipe'
import Profile from './mainpages/Profile'
import NotFound from './mainpages/NotFound'
import ResetPwd from './mainpages/ResetPwd'
import AuthUser from './mainpages/AuthUser'
import Bookmarks from './mainpages/Bookmarks'
import EditRecipe from './mainpages/EditRecipe'
import Login from './mainpages/Login'
import Register from './mainpages/Register'
import Navbar from './components/Navbar/Navbar'
import UserRecipes from './mainpages/UserRecipes'
import RequireAuth from './components/RequireAuth'
import CreateRecipe from './mainpages/CreateRecipe'
import ChangePassword from './mainpages/ChangePassword'
import Loader from './components/Loaders/Loader'


import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'
import { ThemeProvider } from './context/ThemeProvider'
// const Home = lazy(() => import('./main pages/Home'))
// const Recipe = lazy(() => import('./mainpages/Recipe'))
// const UserRecipes = lazy(() => import('./mainpages/UserRecipes'))
// const Profile = lazy(() => import('./mainpages/Profile'))


function App() {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route path='/' element={<Navigate to='/feed'/>} />
            <Route path='/feed' element={<Home />} />
            <Route path='/auth' element={<AuthUser />} />
            <Route path='/reset' element={<ResetPwd />} />
            <Route path='/recipe/:id' element={<Recipe />} />
            <Route path='/reset-password/:id/:token' element={<ChangePassword />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* PROTECTED ROUTES */}
            <Route element={<RequireAuth />}>
              <Route path='/bookmarks' element={<Bookmarks />} />
              <Route path='/edit/:id' element={<EditRecipe />} />
              <Route path='/create' element={<CreateRecipe />} />
              <Route path='/user/:id' element={<UserRecipes />} />
              <Route path='/auth' element={<Navigate to='/feed'/>} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default App  
{/* <Route path='/bookmarks' element={<Suspense fallback={<Loader />}> <Bookmarks /> </Suspense>} />
<Route path='/user/:id' element={<Suspense fallback={<Loader />}> <UserRecipes /> </Suspense>} />
<Route path='/profile/:id' element={<Suspense fallback={<Loader />}> <Profile /> </Suspense>} /> */}