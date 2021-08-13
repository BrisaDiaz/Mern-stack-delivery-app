import React, { Suspense, lazy, Fragment } from "react";

import useApp from "./hooks/useApp";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "styled-components";
import theme from "./theme/styles";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Footer from "./components/Footer";
import LoadingPage from "./components/LoadingPage";
import OrderNotificationPopUp from "./components/OrderNotificationPopUp";
import Header from "./components/Header";
import NotFound404Page from "./components/NotFound404Page";
import SuccessfullFormModal from "./components/SuccessfullFormModal";
import ShooppingCart from "./components/shopping_cart/ShoppingCart";
import ProductsDetails from "./components/product_details/ProductDetails";
import DashboarOrderDetails from "./components/dashboard/DashboarOrderDetails";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Home = lazy(() => import("./components/home/Home"));
const Menu = lazy(() => import("./components/menu/Menu"));
const Contact = lazy(() => import("./components/contact/Contact"));
const Login = lazy(() => import("./components/auth/Login"));
const SignUp = lazy(() => import("./components/auth/SignUp"));
const MyProfile = lazy(() => import("./components/account/MyProfile"));
const EditMyProfile = lazy(() => import("./components/account/EditMyProfile"));
const UserOrdersPage = lazy(() =>
  import("./components/account/UserOrdersPage")
);
const UserOrderDetailsPage = lazy(() =>
  import("./components/account/UserOrderDetailsPage")
);
const EmailConfirmationModal = lazy(() =>
  import("./components/auth/EmailConfirmationModal")
);
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));
const DashboardCategories = lazy(() =>
  import("./components/dashboard/DashboardCategories")
);
const DashboardOrders = lazy(() =>
  import("./components/dashboard/DashboardOrders")
);
const DashboardUsers = lazy(() =>
  import("./components/dashboard/DashboardUsers")
);
const DashboardEditProduct = lazy(() =>
  import("./components/dashboard/DashboardEditProduct")
);
const DashboardProducts = lazy(() =>
  import("./components/dashboard/DashboardProducts")
);
const DashboardNewProduct = lazy(() =>
  import("./components/dashboard/DashboardNewProduct")
);

function App() {
  let {
    setOrderActualizationNotification,
    setNewOrdersNotification,
    newOrdersNotification,
    orderActualizationNotification,
    orderActualizationMessage,
  } = useApp();

  return (
    <Router>
      <ScrollToTop />

      <ThemeProvider theme={theme}>
        <OrderNotificationPopUp
          message={orderActualizationMessage}
          notification={orderActualizationNotification}
        />
        <OrderNotificationPopUp
          message="Nuevos Pedidos"
          notification={newOrdersNotification}
        />
        <SuccessfullFormModal />
        <LoadingPage />
        <ShooppingCart />
        <Header />

        <Suspense fallback={<LoadingPage isLoading={true} />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/menu/:productId" component={ProductsDetails} />

            <Route path="/authentication/login" exact component={Login} />
            <Route path="/authentication/signUp" exact component={SignUp} />
            <Route
              path="/authentication/resetPassword/:token"
              component={ResetPassword}
            />
            <Route path="/contact" component={Contact} />

            <PublicRoute
              path="/authentication/confirmation"
              component={EmailConfirmationModal}
            />
            <PublicRoute path="/myAccount/myProfile" component={MyProfile} />
            <PublicRoute
              path="/myAccount/editProfile"
              component={EditMyProfile}
            />
            <PublicRoute
              path="/myAccount/myOrders"
              exact
              component={() => (
                <UserOrdersPage
                  setNotification={setOrderActualizationNotification}
                />
              )}
            />
            <PublicRoute
              path="/myAccount/myOrders/:orderID"
              component={UserOrderDetailsPage}
            />

            <PrivateRoute
              path="/dashboard/myProducts"
              component={DashboardProducts}
            />
            <PrivateRoute
              path="/dashboard/newProduct"
              component={DashboardNewProduct}
            />
            <PrivateRoute
              path="/dashboard/editProduct"
              component={DashboardEditProduct}
            />
            <PrivateRoute path="/dashboard/users" component={DashboardUsers} />
            <PrivateRoute
              path="/dashboard/orders"
              exact
              component={() => (
                <DashboardOrders setNotification={setNewOrdersNotification} />
              )}
            />
            <PrivateRoute
              path="/dashboard/orders/:orderID"
              component={DashboarOrderDetails}
            />
            <PrivateRoute
              path="/dashboard/categories"
              component={DashboardCategories}
            />

            <Route path="*" component={NotFound404Page} />
          </Switch>
        </Suspense>

        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
