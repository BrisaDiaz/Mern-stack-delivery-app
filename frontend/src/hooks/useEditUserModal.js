
import {useState} from 'react' 
import updateUserAPI from '../API/updateUserAPI'

export default  function useEditUserModal({token,setIsEditing,setAllUsers}){
const [serverError,setServerError] = useState("")
const [isFormLoading,setFormIsLoading] = useState(false)

 function editUser(e,id) {

    e.preventDefault();
const rolesInputs=[e.target.moderator,e.target.admin,e.target.user]

 const selectRoles = rolesInputs.filter(role => role.checked === true ).map(role => role.value);
 
const roles = (selectRoles.length !== 0) ? selectRoles : ["user"];
const info ={
roles,
}
updateUserAPI({
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