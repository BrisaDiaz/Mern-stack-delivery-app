import getCategoriesAPI from './getCategoriesAPI'

async function createCategoryAPI({token,info,setAllCategories,setIsCreateFormLoading,setIsSuccessfullySend}){


  setIsCreateFormLoading(true)
try {


  const headers = new Headers();

 headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
 headers.append('Authorization', `Bearer ${token}`);


       

        const setting = {
          method: 'POST',
            body: JSON.stringify(info),
          headers: headers,
        }

        let res = await fetch("/api/categories", setting);

      setIsCreateFormLoading(false)

      if(res.status === 201) {

      await getCategoriesAPI(setAllCategories)
      setIsSuccessfullySend(true)
      setTimeout(() => {
              setIsSuccessfullySend(false)
      }, 3000);
 return
      
      
    }


       
}catch(err){

  console.log(err)

}

}
export default createCategoryAPI