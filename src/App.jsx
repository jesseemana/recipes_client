import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './mainpages/Home'
import Login from './mainpages/Login'
import Recipe from './mainpages/Recipe'
import Profile from './mainpages/Profile'
import ResetPwd from './mainpages/ResetPwd'
import Register from './mainpages/Register'
import NotFound from './mainpages/NotFound'
import Bookmarks from './mainpages/Bookmarks'
import Navbar from './components/Navbar/Navbar'
import EditRecipe from './mainpages/EditRecipe'
import UserRecipes from './mainpages/UserRecipes'
import RequireAuth from './components/RequireAuth'
import CreateRecipe from './mainpages/CreateRecipe'
import ChangePassword from './mainpages/ChangePassword'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ErrorFallback'
import { ThemeProvider } from './context/ThemeProvider'

function App() {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route path='/' element={<Navigate to='/feed'/>} />
            <Route path='/feed' element={<Home />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/reset' element={<ResetPwd />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/recipe/:id' element={<Recipe />} />
            <Route path='/auth/reset-password/:id/:token' element={<ChangePassword />} />

            {/* PROTECTED ROUTES */}
            <Route element={<RequireAuth />}>
              <Route path='/bookmarks' element={<Bookmarks />} />
              <Route path='/edit/:id' element={<EditRecipe />} />
              <Route path='/user/:id' element={<UserRecipes />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/login' element={<Navigate to='/feed'/>} />
              <Route path='/register' element={<Navigate to='/feed'/>} />
              <Route path='/create-recipe' element={<CreateRecipe />} />
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