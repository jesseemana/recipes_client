import { createContext, useState } from 'react'

// interface AuthContextType {
//   auth: Auth
//   setAuth: React.Dispatch<React.SetStateAction<Auth>>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState<Auth>({})

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext  