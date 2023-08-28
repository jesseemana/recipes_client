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
  children: React.ReactElement
}

interface ButtonProps {
  label: string
  disabled?: boolean
  type: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface BookmarkProps {
  id: string | number
  auth: Auth,
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

interface Menu {
  onClick: () => void
  icon: React.ReactElement
} 

interface Recipe {
  id: number | string
  category: string
  image: string
  name: string
  time: number
}

interface RecipeCard {
  user: User
  data: Recipe
  disabled: boolean
  actionId: string | number
  primaryAction: (value: string | number) => void
  isOpen?: boolean
  setIsOpen?: () => void
  primaryActionLabel?: string
}
