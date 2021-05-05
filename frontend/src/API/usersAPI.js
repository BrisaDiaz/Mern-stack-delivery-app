async function getUsers({token,setAllUsers}){
       const headers = new Headers();
        headers.append('Accept', 'application/json');
      headers.append('x-access-token', token);


    const setting = {
          method: 'GET',
          headers: headers,

        }
    try{

const res = await fetch('http://localhost:7000/api/users', setting);
  const data = await res.json()

setAllUsers(data)

    }catch(err){

      console.log(err)
    }

  };
  
  export default getUsers