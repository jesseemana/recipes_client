import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import AuthUser from './pages/AuthUser';
import Feed from './pages/Feed'
import Recipe from './pages/Recipe'
import User from './pages/User'


function App() { 
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<AuthUser />} />
        <Route path='/home' element={<Feed />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/user/:id' element={<User />} />
      </Routes>
    </>
  )
}

export default App
