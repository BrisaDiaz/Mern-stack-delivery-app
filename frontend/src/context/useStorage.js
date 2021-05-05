import { useContext} from 'react'
import AppContext from '../context/app-context'

function useStorage(){

return useContext(AppContext);
} 

export default useStorage