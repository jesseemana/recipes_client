interface User {
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  bookmarks: [string | number]
}

interface Auth {
  user: User,
  access_token: string
}

interface ChildrenProps {
  children: ReactNode
}

interface ButtonProps {
  label: string
  disabled?: boolean
  type: 'button' | 'submit' | 'reset'
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

interface BookmarkProps {
  auth: Auth,
  id: string | number
} 

type InputProps = {
  id: string
  label: string
  type: 'text' | 'password' 
  error: string
  htmlFor: string
  placeholder: string
  inputProps: unknown
  // ref?: LegacyRef<HTMLInputElement> 
  // value?: string 
  // onChange?: (value: ChangeEvent<HTMLInputElement>) => void
}

interface NavProps {
  user: User,
  handleLogout: () => void
} 
 
interface Recipe {
  id: number | string
  category: string
  image: string
  name: string
  time: number
}

interface RecipeCard {
  user?: User
  data: Recipe
  isOpen?: boolean
  disabled?: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  actionId?: string | number
  primaryActionLabel?: string
  primaryAction?: (value: string | number) => void
}

interface Feed {
  user: User
  pages: number
  recipes: []
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

interface AuthProps {
  submitting: boolean
  onSubmit: (data: LoginFields) => Promise<void>
} 