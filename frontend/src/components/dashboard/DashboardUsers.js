import styled  from 'styled-components';
import {useContext,useState} from 'react' 
import AppContext from '../../context/app-context'
import {Link , LinksWrapper} from './DashboardNewProduct';
import EditUserModal from './EditUserModal'


const Section = styled.div`
position:relative;
width:100vw;
min-height:100vh;
height:max-content;
padding:15px;
padding-top:60px;

`;
const UsersTable = styled.div` 
width:100%;
min-width:300px;
margin-top:30px;
border: 1px solid #fecb00;
  border-bottom: none;
  flex:1;

`
export const AdminTable = styled.div` 

width:100%;
min-width:300px;
margin: 0 5px;
height:max-content;
margin-top:30px;
border: 1px solid #fecb00;
  border-bottom: none;
flex:1;
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
    color: #ffffff;
line-height: 40px;
`

const Wrapper= styled.div`
margin-top:10px;
display:flex;
justify-content:space-between;
`;
const UserCell = styled.div`
background:#fecb0005;
width:100%;
display:flex;
flex-flow:column;
align-items:space-between;

padding: 5px 10px;
  border-bottom: 1px solid #fecb00;
`;

const UserStatus = styled.b`
    padding:  5px 8px;
    background: #e83c2e ;
    border-radius: 10px;
    color: #ffffff;
    cursor:pointer;
`


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
<Section>
   <LinksWrapper>
             <Link to="/dashboard/myProducts" >Productos </Link>/<Link to="/dashboard/newProduct" >Nuevo Producto</Link>
          </LinksWrapper>
          <EditUserModal user={editingUser} isEditing={isEditing} setIsEditing={setIsEditing}/>

          <TablesContainer>
<UsersTable>
  <TableHeader>
    <TableTitle>Usuarios</TableTitle>
  </TableHeader>

{normalUsers.map(user =>
   <UserCell key={user._id}>
    <b>{user.name}</b><p>{user.email}</p> 
    <Wrapper>
 <p>{user.createdAt.slice(0,10).split("-").reverse().join(" /")}</p>

 {user.roles.map(role =>
   <UserStatus key={role._id} onClick={()=> handelClick(user)}>{role.name}</UserStatus>
  )}

    </Wrapper>
   
  </UserCell>
  
  
  )}
 

</UsersTable>
<AdminTable>
  <TableHeader>
    <TableTitle>Admins y Mediadores</TableTitle>
  </TableHeader>
  {adminsAndModerators.map(user =>
       <UserCell key={user._id}>
    <b>{user.name}</b><p>{user.email}</p> 
   < Wrapper>
<p>{user.createdAt.slice(0,10).split("-").reverse().join(" /")}</p>
        {user.roles.map(role =>
   <UserStatus key={role._id}  onClick={()=> handelClick(user)}>{role.name}</UserStatus>
  )}
   </Wrapper>
    </UserCell>
    
    )}

   
</AdminTable>

</TablesContainer>
</Section>
  );
}