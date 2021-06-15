
import {useState} from 'react' 
import updateUserAPI from '../API/updateUserAPI'
import {useStorage} from '../context/useStorage'



export default  function useEditUserModal({setIsEditing}){

  const {token,setAllUsers} = useStorage()
  
const [serverError,setServerError] = useState("")
const [isFormLoading,setFormIsLoading] = useState(false)

 async function editUser(e,id) {

  e.preventDefault();
const roles = e.target.role.value

const info ={
roles,
}

await updateUserAPI({
  setFormIsLoading,
setIsEditing,
setServerError,
info,
setAllUsers,
token,
id
})
  
  }

 const handelReset = () =>{
setIsEditing(false);
 setServerError("");
}
const handelSubmit = (e,userId) =>{
  editUser(e,userId)
}
  return {
  handelReset,
handelSubmit,
    serverError,
isFormLoading
} 
     }