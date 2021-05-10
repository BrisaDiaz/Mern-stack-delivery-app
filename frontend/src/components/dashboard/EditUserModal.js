import styled  from 'styled-components';
import {useContext} from 'react' 
import AppContext from '../../context/app-context'
import {FormButtons } from './CreateNewProductForm'
import useEditUserModal from '../../hooks/useEditUserModal'
import {TableTitle} from './DashboardUsers'
import {LoaderSpinner} from './../LoaderSpinner'
import {ErrorServerMessage} from '../auth/SingupForm'

const EditModal = styled.div`
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
background:#0000002b;
display: ${(props)=>(props.isEditing === true ? "block" : "none")};

`
const EditTable = styled.div` 
max-width:320px;
min-width:300px;
height:max-content;
  border-bottom: none;
border: 1px solid #e83c2e;
margin: 0 auto;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
`
const EditTableBody = styled.div`
padding: 15px;
background:#ecccc9;
`
const EditTableHeader = styled.div`
background:  #e83c2e;
width:100%;
padding: 5px 15px;
`
export const InfoLabel= styled.b`
color:#e83c2e;
margin-right:5px;
`;
export const RolesLabel = styled.h4`
margin: 10px 0;

`
 const RoleInput = styled.input`
visibility:hidden;
position:relative;
margin-right:${(props)=>(props.marg)};
&:before{
  visibility:visible;
  content:'${(props)=>(props.role)}';
  position:absolute;
    background:#000;
  display:flex;
  justify-content:center;
  align-items:center;
    padding:  10px;
  
 border-radius: 10px;
    color: #ffffff;
    cursor:pointer;
    font-weight:900;
        box-shadow: 1px 1px 3px #000;
}
&:checked:before{
  background:#e83c2e;
}
`;

const EditForm= styled.form`
display:flex;
flex-flow:column;
align-items:center;
`;
 const InputWrapper = styled.div` 
display:flex;
width:100%;
justify-content:space-evenly;
margin: 0 40px 40px  10px;

`;
export function RolesInputs(){
  return(
<InputWrapper>
         <RoleInput type="checkbox"  role="Admin" name="admin" marg="30px"  value="admin"></RoleInput>
<RoleInput type="checkbox" role="Mediador" marg=" 50px"  name="moderator" value="moderator"></RoleInput>
<RoleInput type="checkbox"   role="Usuario"  marg="30px" name="user" value="user"></RoleInput>
         </InputWrapper>
  );
}
 export default function EditUserForm({user,isEditing
,setIsEditing}) {

const {token,setAllUsers} = useContext(AppContext);


const {serverError,isFormLoading,handelReset,handelSubmit} = useEditUserModal({token,setIsEditing,setAllUsers})



return(
    <EditModal isEditing={isEditing}>
          <EditTable>
   <EditTableHeader>
    <TableTitle>Editar Usuario</TableTitle>
    
  </EditTableHeader>
  <EditTableBody>
      <p><InfoLabel>Nombre: </InfoLabel>{user.name}</p>
      <p><InfoLabel>Email: </InfoLabel>{user.email}</p>
       <RolesLabel>Selecciónar Roles:</RolesLabel>

   <EditForm onSubmit={(e) =>handelSubmit(e,user._id)} onReset={handelReset}>
         <RolesInputs/>
    {isFormLoading ?  <LoaderSpinner/> :

         <ErrorServerMessage>{serverError}</ErrorServerMessage>
          }    

<FormButtons />
       </EditForm>
        


    </EditTableBody>
</EditTable>
</EditModal>
  
);
}

