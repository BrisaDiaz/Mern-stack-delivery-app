

export default async function getCategoryAPI(setAllCategories){

   const headers = new Headers();
        headers.append('Accept', 'application/json');
     

    const setting = {
          method: 'GET',
          headers: headers,

        }
try{
let res =  await fetch('/api/categories',setting)
let  json= await res.json()

const {data} = json

setAllCategories(data)


}catch(err){


  console.log(err)
}
}  
