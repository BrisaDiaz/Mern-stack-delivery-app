import {  useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useStorage} from '../context/useStorage'
import accountConfirmationAPI from '../API/accountConfirmationAPI'


 
export default function useEmailConfirmationModal(){

   const {setIsSuccessfullySend} =useStorage()
   
 const history= useHistory()

 
const [isRequesLoading, setIsRequesLoading] = useState(false)

const sendConfirmationEmail = async() =>{

 await accountConfirmationAPI ({setIsRequesLoading,setIsSuccessfullySend,history})

}
  return {isRequesLoading,sendConfirmationEmail}
}