import {Redirect,Route} from 'react-router-dom'
import {useContext } from 'react' 
import AppContext from '../context/app-context'
export default function PrivateRoute  ({component: Component, ...rest}) {
       const {isAdmin} = useContext(AppContext);
    return (

        <Route {...rest} render={props => (
            isAdmin ?
                <Component {...props} />
            : <Redirect to="/authentication" />
        )} />
    );
};
