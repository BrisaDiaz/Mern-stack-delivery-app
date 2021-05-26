async function getUsers({token,setAllUsers}){
       const headers = new Headers();
        headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


    const setting = {
          method: 'GET',
          headers: headers,

        }
    try{

const res = await fetch('/api/users', setting);
  const data = await res.json()
if (res.status === 200){

  setAllUsers(data)

}


    }catch(err){

      console.log(err)
    }

  };
  
  export default getUsers