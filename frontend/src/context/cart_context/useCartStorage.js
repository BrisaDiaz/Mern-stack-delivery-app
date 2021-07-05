import CartContext from './cart-context'
import { useContext} from 'react'

export function useCartStorage(){

  return  useContext(CartContext)
}

