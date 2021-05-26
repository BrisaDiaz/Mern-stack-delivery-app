
import getCategoriesAPI from './getCategoriesAPI'

export default async function  deleteCategoryAPI({categorySelectId,token,setAllCategories}){

 const headers = new Headers();
           headers.append('Accept', 'application/json');
     headers.append('Authorization', `Bearer ${token}`);
        const setting = {
          method: 'DELETE',
          headers: headers,

        }


try {
        let res = await fetch("/api/categories/"+categorySelectId, setting);

    if(res.status >= 200  || res.status < 300  ){

      await getCategoriesAPI(setAllCategories)
return
    }

}catch(err){
  console.log(err)
}

}