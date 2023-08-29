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
  children: React.ReactNode
}

interface ButtonProps {
  label: string
  disabled?: boolean
  type: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface BookmarkProps {
  auth: Auth,
  id: string | number
} 

interface InputProps {
  id: string
  label: string
  type?: string 
  value?: string 
  htmlFor: string
  placeholder: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
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
  currentPage: number
  setCurrentPage: React.Dispatch<SetStateAction<number>>
}