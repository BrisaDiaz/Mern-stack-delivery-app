
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

     if(res.status  ===204 )return  await getCategoriesAPI(setAllCategories)
if(res.status === 403) return   alert('Se require rol de Administrador') 

}catch(err){
  console.log(err)
}

}