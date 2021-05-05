
export default function useCartProductDeleteButton(deleteOfCart,deleteOfTotalCost){

  const deleteOfCartAndTotalCostHandler= (id,cost) =>{

deleteOfTotalCost(cost)
    deleteOfCart(id)

}
  return {deleteOfCartAndTotalCostHandler}
}