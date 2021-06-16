import Auth from './Auth'
import LoginForm from './LoginForm'
import ForgotPasswordModal from './ForgotPasswordModal'
import {useState} from 'react' 

export default function Login(){

const [isModalOpened,setIsModalOpened]=useState(false)

  return(
<Auth>
  <LoginForm setIsModalOpened={setIsModalOpened} />
  <ForgotPasswordModal   setIsModalOpened={setIsModalOpened}  isModalOpened={isModalOpened}
  />
</Auth>
  )
}