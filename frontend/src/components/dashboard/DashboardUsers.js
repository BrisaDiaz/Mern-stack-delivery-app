import styled  from 'styled-components';
import {useContext,useState,Fragment} from 'react' 
import AppContext from '../../context/app-context'
import DashboardNav from '../DashboardNav'

import EditUserModal from './EditUserModal'
import SeeMoreButton from "./../SeeMoreButton"

const Page = styled.main`
position:relative;
width:100vw;
min-height:100vh;
height:max-content;
padding:15px;
padding-top:60px;
margin-left: -6px;

`;
const UsersTable = styled.div` 
width:100%;
min-width:300px;
margin-top:30px;
  background:  #272727;
  flex:1;
      box-shadow: 2px 4px 8px rgb(0 0 0 / 20%);
    border-radius: 4px;
`
export const AdminTable = styled.div` 
    border-radius: 4px;
width:100%;
min-width:300px;
margin: 0 5px;
    box-shadow: 2px 4px 8px rgb(0 0 0 / 20%);
height:max-content;
margin-top:30px;

flex:1;
  color: #ffffff;
      background:  #272727;
`

const TablesContainer = styled.div`
display:flex;
width:90%;
    flex-wrap: wrap-reverse;
align-items:start;
margin:0 auto;
justify-content:center;
`;
export const TableHeader = styled.div`
width:100%;
padding: 5px 15px;
background: #fecb00;

  
`
export const TableTitle = styled.h4`
margin:0;
font-size:25px;
text-align:center;
text-shadow: -2px -1px 0 #000000;
    color: #ffffff;
line-height: 40px;
`

const Wrapper= styled.div`
margin-top:5px;
display:flex;
justify-content:space-between;
`;
const UserCell = styled.div`
position:relative;
background:#fecb0005;
width:100%;
display:flex;
flex-flow:column;
align-items:space-between;
padding: 5px 15px;
  border-bottom: 1px solid rgb(252 175 1);
  & > b{
     color: #e83c2e;
    margin-right: 5px;
        font-family: "Oswald", sans-serif;

  }
`;
const UserName = styled.h4`
font-size: 19px;
text-transform: capitalize;
text-align:center;
margin-bottom:5px;
`;
const UserStatus = styled.b`
padding: 5px 8px;
    background: #e83c2e;
    border-radius: 10px;
    color: #ffffff;
    cursor: pointer;
    text-shadow: 0 0 1px black;
    box-shadow: inset 0 0 5px #9c0101;
    margin-bottom: 5px;
        font-family: "Oswald", sans-serif;

`

function UserInfoCell({user,handelClick}){

 const [isToggledDetails,setIsToggledDetails] = useState(false)
 const trigger= () =>{
 setIsToggledDetails(!isToggledDetails)
 }
  return(
 <UserCell>

      {  (user.number || user.address) && <SeeMoreButton  trigger={trigger}/>}

    <UserName>{user?.name}{user?.client && <span >🍟</span>}</UserName>
    <p> <b>Email:</b>{user?.email}</p> 

    {isToggledDetails && <Fragment>

 {user?.number && <p><b>Número:</b>{user?.number}</p>}
      {user?.address && <p><b>Dirección:</b>{user?.address}</p>}

    </Fragment>}
 
      
    <Wrapper>
 <p>{user?.createdAt.slice(0,10).split("-").reverse().join(" /")}</p>

 {user?.roles.map(role =>
   <UserStatus key={role?._id} onClick={()=> handelClick(user)}>{role?.name}</UserStatus>
  )}

    </Wrapper>
</UserCell>
  );

}

export  default function DashboardUsers(){
  const [editingUser,setEditingUser] = useState("")
 const [isEditing,setIsEditing] = useState(false)

  const handelClick = (user) =>{
setEditingUser(user);
setIsEditing(true) ;
  }
    const {users} = useContext(AppContext);

    const normalUsers = users.filter(user => user.roles[0].name ==='user')
    const adminsAndModerators =users.filter(user =>
      
      user.roles[0].name ==='admin' || 
     user.roles[0].name ==='moderator'

    )

  return(
<Page>
   <DashboardNav/>
            
          <EditUserModal user={editingUser} isEditing={isEditing} setIsEditing={setIsEditing}/>

          <TablesContainer>
<UsersTable>
  <TableHeader>
    <TableTitle>Usuarios</TableTitle>
  </TableHeader>

{normalUsers.map(user =>
 <UserInfoCell key={user._id} user={user} handelClick={handelClick}>
  </UserInfoCell>
  
  )}
 

</UsersTable>
<AdminTable>
  <TableHeader>
    <TableTitle>Admins y Mediadores</TableTitle>
  </TableHeader>
  {adminsAndModerators.map( user =>
       <UserInfoCell key={user._id} user={user} handelClick={handelClick}>
  </UserInfoCell>
    
    )}
</AdminTable>

</TablesContainer>
</Page>
  );
}


