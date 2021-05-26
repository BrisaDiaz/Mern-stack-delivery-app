import getCategoriesAPI from './getCategoriesAPI'


export default async function updateCategoryNameAPI({categorySelectId,info,setIsRenameFormLoading,setIsSuccessfullySend,token,setAllCategories}){

setIsRenameFormLoading(true)

   const headers = new Headers();
        headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);

        const setting = {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(info),
        }


try{

        let res = await fetch(`/api/categories/${categorySelectId}`, setting);
  

setIsRenameFormLoading(false)

         if(res.status === 200) {
    

       await getCategoriesAPI(setAllCategories)

         setIsSuccessfullySend(true);
         setTimeout(() => {
                  setIsSuccessfullySend(false)
         }, 3000);

     return
      }
      


 }catch(err){

  console.log(err)
}


}