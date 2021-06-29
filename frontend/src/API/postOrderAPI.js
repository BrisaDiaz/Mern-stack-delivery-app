


async function postOrderAPI({resetTotalCost,cartProducts,token,emptyCart,setCartIsLoading,toggleCart,history}){

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
setCartIsLoading(false)


      if(res.status === 201) {
      
      emptyCart()
      resetTotalCost()
     toggleCart(false)

      return history.push("/myAccount/myOrders")
      
    }


       
}catch(err){

  console.log(err)

}

}
export default postOrderAPI