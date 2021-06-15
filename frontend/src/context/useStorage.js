import AppContext from './app-context'
import { useContext} from 'react'

export function useStorage(){

  return  useContext(AppContext)
} 

