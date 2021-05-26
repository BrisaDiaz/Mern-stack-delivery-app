import styled  from 'styled-components';
import {useContext} from 'react' 
import AppContext from '../../context/app-context'
import {FormButtons } from './CreateNewProductForm'
import useEditUserModal from '../../hooks/useEditUserModal'
import {TableTitle} from './DashboardUsers'
import {LoaderSpinner} from './../LoaderSpinner'
import {ErrorServerMessage} from '../auth/SingupForm'
import {OptionList,Option} from '../SortProductsOptions'
const EditModal = styled.div`
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
padding:15px;
background:#0000002b;
display: ${(props)=>(props.isEditing === true ? "block" : "none")};
z-index:1000;

`
const EditTable = styled.div` 
max-width:370px;
width:100%;
height:max-content;
    box-shadow: 2px 4px 14px 6px rgb(23 23 23 / 36%);
margin: 0 auto;
position:absolute;
top:50%;
border-radius: 5px;
left:50%;
transform:translate(-50%,-50%);
`
const EditTableBody = styled.div`
padding: 10px 15px 20px;
color: #ffffff;
  background:  #272727;
text-align:center;
& > h4 {
margin-bottom: 5px;
}
& > h3:last-child {
color: #e83c2e;
margin-bottom: 10px;
}
`
const EditTableHeader = styled.div`
background: #e83c2e;
    width: 100%;
    padding: 8px 15px;
  text-shadow: -2px -1px 0 #000000;
    box-shadow: inset 0 0 20px 5px rgb(23 23 23 / 15%);
`




const EditForm= styled.form`
display:flex;
flex-flow:column;
align-items:center;
& > ${LoaderSpinner}{
  margin-bottom:10px;
}
& >  ${FormButtons} > inputs{
    transform: scale(0.8);
}

& >  ${OptionList} {
margin: 10px auto;
}
`;


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
      <h3>{user?.name}</h3>
       <h4>Selecciónar Roles</h4>

   <EditForm onSubmit={(e) =>handelSubmit(e,user._id)} onReset={handelReset}>

  <OptionList name="role">
<Option value="user" >User</Option>
<Option value="admin" >Admin</Option>
<Option value="moderator" >Moderador</Option>

</OptionList>
    {isFormLoading ?  <LoaderSpinner small /> :

         <ErrorServerMessage>{serverError}</ErrorServerMessage>
          }            

<FormButtons />
       </EditForm>
        


    </EditTableBody>
</EditTable>
</EditModal>
  
);
}

