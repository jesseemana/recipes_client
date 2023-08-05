import { useState } from 'react'
import useDocumentTitle from "../hooks/useDocumentTitle"

const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useDocumentTitle('Change Password')
  
  return (
    <div>ChangePassword</div>
  )
}

export default ChangePassword