import {Redirect,Route} from 'react-router-dom'
import {useContext } from 'react' 
import AppContext from '../context/app-context'
export default function PrivateRoute  ({component: Component, ...rest}) {
       const {isAdmin,isModerator} = useContext(AppContext);

       const AdminPrivateRoutes = ["/dashboard/users"] ;
       
       let requireAdmin;

       for( let i =0 ; i < AdminPrivateRoutes.length ; i ++){
          if( rest.path === AdminPrivateRoutes[i]) requireAdmin = true 

       }
       if(requireAdmin){

return (

        <Route {...rest} render={props => (
          
            (isAdmin)?
                <Component {...props} />
            : <Redirect to="/authentication/login" />
        )} />
    );


       }else{
         
   return (

        <Route {...rest} render={props => (
          
            (isAdmin  || isModerator)?
                <Component {...props} />
            : <Redirect to="/authentication/login" />
        )} />
    );

       }
 
};
