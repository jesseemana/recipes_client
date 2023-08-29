import { createContext, useState } from 'react'

// interface AuthContextType {
//   auth: Auth
//   setAuth: React.Dispatch<React.SetStateAction<Auth>>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({})

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext  