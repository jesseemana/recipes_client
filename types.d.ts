interface ChildrenProps {
  children: React.ReactElement
}

interface ButtonProps {
  disabled: boolean | undefined
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  label: string
  type: 'button' | 'submit' | 'reset'
}

interface Auth {
  user: {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    bookmarks: string[]
  },
  access_token: string
}

interface UseBookmarkProps {
  id: string
  auth: Auth,
} 

interface InputProps {
  type: string | undefined
  value: string | undefined
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  htmlFor: string
  label: string
  id: string
}