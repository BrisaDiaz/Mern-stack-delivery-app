
import currentUserAPI from '../API/currentUserAPI'

async function postOrderAPI({resetTotalCost,cartProducts,token,emptyCart,setCurrentUser,toggleCart}){

try {


 const productsArray = cartProducts.map( product =>
 ({
        productId: product.info._id,
        quantity: product.quantity
})    
  )





  const headers = new Headers();

 headers.append('Accept', 'application/json');

 headers.append('Authorization', `Bearer ${token}`);
headers.append('Content-Type', 'application/json');

       

        const setting = {
          method: 'POST',
            body: JSON.stringify({order:productsArray}),
          headers: headers,
        }



        let res = await fetch("/api/orders", setting);



      if(res.status === 201) {
      
      emptyCart()
      resetTotalCost()
     toggleCart(false)
      await   currentUserAPI({setCurrentUser,token})

      return
      
    }


       
}catch(err){

  console.log(err)

}

}
export default postOrderAPI