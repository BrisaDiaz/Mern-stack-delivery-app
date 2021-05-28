
import {ThemeProvider} from 'styled-components'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Footer from './components/Footer'
import LoadingPage from './components/LoadingPage'
import Home from './components/home/Home'
import Menu from './components/menu/Menu'
import DashboardNewProduct from './components/dashboard/DashboardNewProduct'
import DashboardProducts from './components/dashboard/DashboardProducts'
import DashboardEditProduct from './components/dashboard/DashboardEditProduct'
import DashboardUsers from './components/dashboard/DashboardUsers'
import DashboardOrders from './components/dashboard/DashboardOrders'
import DashboarOrderDetails from  './components/dashboard/DashboarOrderDetails'
import DashboardCategories from './components/dashboard/DashboardCategories'
import Header from './components/Header'
import NotFound404Page from './components/NotFound404Page'
import SuccessfullFormModal from './components/SuccessfullFormModal'
import InitSession from './components/auth/Auth'
import Confimation from './components/auth/Confirmation'
import ProductsDetails from './components/product_details/ProductDetails'
import Contact  from './components/contact/Contact'
import AppState  from './context/AppState'
import ShooppingCart from './components/shopping_cart/ShoppingCart'
import EditMyProfile from './components/account/EditMyProfile'
import MyOrdersPage from './components/account/MyOrdersPage'
import OrderDetails from './components/account/OrderDetails'
import MyProfile from './components/account/MyProfileInfo'
import {
  BrowserRouter as Router,
  Switch,
  Route


} from 'react-router-dom'


function App() {




    return (
        
      <Router>
        <AppState>
     <ThemeProvider theme={
       {
         darckYellow: `#fcaf01`,
         lightYellow:'rgb(255 165 0 / 58%)',
         orange:'#e83c2e',
         darckRed:'#9c0101',
         black: '#272727',
         gray:'#F0F0F0',
         darckTextShadow:'  -2px -1px 0 #000',
         whiteTextShadow:'  -2px -1px 0 #fff',
         lightTextShadow:'-1px 1px 1px #000',
         lightBoxShadow:'1px 1px 5px #00000057',
         darckBoxShadow:'2px 4px 14px 6px rgb(23 23 23 / 36%);',
         inputShadow:'inset 1px 1px 6px 0px #ccc'
       }
     }>
          <SuccessfullFormModal/>
          <LoadingPage/>
        <Header/>
  <Switch>
        <Route path = "/" exact component={ Home } />
    
        <Route path = "/menu" exact component={ Menu } />
    
    
        <Route path = "/authentication" exact component={ InitSession }  />
     <PublicRoute path = "/authentication/confirmation" component={ Confimation }  />
        <Route path = "/contact" component={ Contact } />
       
    <PublicRoute path = "/myAccount/myProfile" component ={MyProfile}/>

        <PublicRoute path = "/myAccount/editProfile"
        component={EditMyProfile}/>
             <PublicRoute   path = "/myAccount/myOrders" exact component={ MyOrdersPage }  />
               <PublicRoute path = "/myAccount/myOrders/:orderID"   component={ OrderDetails } />

          <Route path = "/menu/:productId" component={ ProductsDetails } />
         <PrivateRoute path = "/dashboard/myProducts" component={ DashboardProducts } />
              
<PrivateRoute path = "/dashboard/newProduct" component={ DashboardNewProduct } />
       <PrivateRoute path =  "/dashboard/editProduct"  component={   DashboardEditProduct } />
              <PrivateRoute path = "/dashboard/users"  component={   DashboardUsers } />
         <PrivateRoute   path = "/dashboard/orders"  exact component={ DashboardOrders } />
                   <PrivateRoute path = "/dashboard/orders/:orderID" component={DashboarOrderDetails } />

               <PrivateRoute   path = "/dashboard/categories" component={ DashboardCategories } />
 
            <Route path = "*" component={NotFound404Page} />
          
 
      </Switch>


     <ShooppingCart/>
        <Footer/>
</ThemeProvider>
    </AppState>
      </Router>

    );
  }

export default App;
