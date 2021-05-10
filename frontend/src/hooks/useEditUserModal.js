
import {useState} from 'react' 
import uploadUserAPI from '../API/uploadUserAPI'

export default  function useEditUserModal({token,setIsEditing,setAllUsers}){
const [serverError,setServerError] = useState("")
const [isFormLoading,setFormIsLoading] = useState(false)

 function editUser(e,id) {

    e.preventDefault();

uploadUserAPI({
  setFormIsLoading,
setIsEditing,
setServerError,
e,
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