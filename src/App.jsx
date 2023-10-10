import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '@/mainpages/Home'
import Login from '@/mainpages/Login'
import Recipe from '@/mainpages/Recipe'
import Profile from '@/mainpages/Profile'
import Register from '@/mainpages/Register'
import NotFound from '@/mainpages/NotFound'
import ResetPwd from '@/mainpages/ResetPwd'
import Bookmarks from '@/mainpages/Bookmarks'
import Navbar from '@/components/Navbar/Navbar'
import EditRecipe from '@/mainpages/EditRecipe'
import UserRecipes from '@/mainpages/UserRecipes'
import RequireAuth from '@/components/RequireAuth'
import CreateRecipe from '@/mainpages/CreateRecipe'
import ChangePassword from '@/mainpages/ChangePassword'

import ErrorFallback from '@/components/ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'
import { ThemeProvider } from '@/context/ThemeProvider'

function App() {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path='/' element={<Navigate to='/feed'/>} />
            <Route path='/feed' element={<Home />} />
            <Route path='/recipe/:id' element={<Recipe />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/reset' element={<ResetPwd />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/reset-password/:id/:token' element={<ChangePassword />} />
            {/* PROTECTED ROUTES */}
            <Route element={<RequireAuth />}>
              <Route path='/bookmarks' element={<Bookmarks />} />
              <Route path='/create' element={<CreateRecipe />} />
              <Route path='/edit/:id' element={<EditRecipe />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/user/:id' element={<UserRecipes />} />
              <Route path='/auth/login' element={<Navigate to='/feed'/>} />
              <Route path='/auth/register' element={<Navigate to='/feed'/>} />
            </Route>
            {/* NOT FOUND */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default App  