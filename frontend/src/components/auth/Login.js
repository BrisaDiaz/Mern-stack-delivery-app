import Auth from './Auth'
import { withError } from './../withError'
import LoginForm from './LoginForm'
import ForgotPasswordModal from './ForgotPasswordModal'
import {useState} from 'react' 

function Login(){

const [isModalOpened,setIsModalOpened]=useState(false)

  return(
<Auth>
  <LoginForm setIsModalOpened={setIsModalOpened} />
  <ForgotPasswordModal   setIsModalOpened={setIsModalOpened}  isModalOpened={isModalOpened}
  />
</Auth>
  )
}
export default withError(Login)