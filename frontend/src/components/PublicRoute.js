
import {Redirect,Route} from 'react-router-dom'
import {useContext } from 'react' 
import AppContext from '../context/app-context'
export default function PublicRoute  ({component: Component, ...rest}) {
       const {isLogin,isSingUp} = useContext(AppContext);
    
       if (rest.path === "/authentication/confirmation/:email") {
    return (

        <Route {...rest} render={props => (
            isSingUp ?
                <Component {...props} />
            : <Redirect to="/authentication" />
        )} />
    )

  }else{

 return (

        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
            : <Redirect to="/authentication" />
        )} />
    )

     }
};
