async function getCurrentUser({setCurrentUser,token}){

    const id = localStorage.getItem('userId')
        const headers = new Headers();
        headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);


    const setting = {
          method: 'GET',
          headers: headers,

        }
    try{

const res = await fetch(`/api/users/me/${id}`,setting);
  const {data} = await res.json()

setCurrentUser(data)


    }catch(err){

      console.log(err)
    }

  };

  export default getCurrentUser