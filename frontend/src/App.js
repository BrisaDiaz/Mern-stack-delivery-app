import React, { Suspense, lazy } from 'react';
import AppState  from './context/AppState'
import  ScrollToTop from './components/ScrollToTop'
import {ThemeProvider} from 'styled-components'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Footer from './components/Footer'
import LoadingPage from './components/LoadingPage'
import Header from './components/Header'
import NotFound404Page from './components/NotFound404Page'
import SuccessfullFormModal from './components/SuccessfullFormModal'
import ShooppingCart from './components/shopping_cart/ShoppingCart'

import {
  HashRouter  as Router,
  Switch,
  Route


} from 'react-router-dom'


const Home = lazy(() => import('./components/home/Home'));
const Menu = lazy(() => import('./components/menu/Menu' ));
const Contact = lazy(() => import('./components/contact/Contact'));
const Athentication = lazy(() => import( './components/auth/Auth'));
const MyProfile = lazy(() => import( './components/account/MyProfile'));
const EditMyProfile = lazy(() => import('./components/account/EditMyProfile'));
const MyOrdersPage = lazy(() => import( './components/account/MyOrdersPage'));
const OrderDetails = lazy(() => import( './components/account/OrderDetails'));
const EmailConfirmationModal = lazy(() => import( './components/auth/EmailConfirmationModal'));
const ProductsDetails = lazy(() => import( './components/product_details/ProductDetails'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const DashboardCategories = lazy(() => import('./components/dashboard/DashboardCategories'));
const DashboarOrderDetails = lazy(() => import( './components/dashboard/DashboarOrderDetails'));
const DashboardOrders = lazy(() => import( './components/dashboard/DashboardOrders'));
const DashboardUsers = lazy(() => import(  './components/dashboard/DashboardUsers'));
const DashboardEditProduct = lazy(() => import( './components/dashboard/DashboardEditProduct'));
const DashboardProducts = lazy(() => import('./components/dashboard/DashboardProducts'));
const DashboardNewProduct = lazy(() => import('./components/dashboard/DashboardNewProduct'));
function App() {




    return (
       

      
      <Router >
      <ScrollToTop />
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
         <Suspense fallback={ <LoadingPage isLoading={true} />}>
  <Switch>
        <Route path = "/" exact component={ Home } />
    
        <Route path = "/menu" exact component={ Menu } />
    
    
        <Route path = "/authentication" exact component={ Athentication }  />
     <PublicRoute path = "/authentication/confirmation" component={ EmailConfirmationModal }  />
          <Route path = "/authentication/resetPassword/:token" component={ ResetPassword }  />
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
</Suspense>

     <ShooppingCart/>
        <Footer/>
</ThemeProvider>
    </AppState>

      </Router>

    );
  }

export default App;
