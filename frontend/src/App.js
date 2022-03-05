import React, { Suspense, lazy } from "react";
import { useStorage } from "./context/useStorage";
import sessionAPI from "./API/getSessionAPI";
import useOrderNotification from "./hooks/useOrderNotification";
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
import SuccessfulFormModal from "./components/SuccessfulFormModal";
import ShoppingCart from "./components/shopping_cart/ShoppingCart";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import DashboardOrderDetails from "./components/dashboard/DashboardOrderDetails";
import Menu from "./components/menu/Menu";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import MyProfile from "./components/account/MyProfile";
import EditMyProfile from "./components/account/EditMyProfile";
import UserOrdersPage from "./components/account/UserOrdersPage";
import UserOrderDetailsPage from "./components/account/UserOrderDetailsPage";
import DashboardNewProduct from "./components/dashboard/DashboardNewProduct";
import DashboardCategories from "./components/dashboard/DashboardCategories";
import DashboardOrders from "./components/dashboard/DashboardOrders";
import DashboardUsers from "./components/dashboard/DashboardUsers";
import DashboardEditProduct from "./components/dashboard/DashboardEditProduct";
import DashboardProducts from "./components/dashboard/DashboardProducts";

const EmailConfirmationModal = lazy(() =>
  import("./components/auth/EmailConfirmationModal")
);
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));

function App() {
  let {
    newOrdersCount,
    actualizationCount,
    orderActualizationMessage,
    closeActualizationNotification,
    closeNewOrderNotification,
  } = useOrderNotification();
  const {
    setToken,
    setIsNotLogin,
    setCurrentUser,
    setIsLogin,
    setIsAdmin,
    setIsModerator,
    setAllCategories,
    setIsLoading,
  } = useStorage();

  React.useEffect(() => {
    const onSuccess = (data) => {
      setToken(data.token);
      setCurrentUser(data.user);
      if (data.user.roles[0].name === "admin") {
        setIsAdmin(true);
      } else if (data.user.roles[0].name === "moderator") {
        setIsModerator(true);
      }

      setIsLogin(true);
    };
    const onError = () => {
      setToken("");
      setIsNotLogin();
      setIsAdmin(false);
      setIsModerator(false);
    };
    sessionAPI(onSuccess, onError);
  }, []);
  React.useEffect(() => {
    const getCategoriesAPI = async () => {
      const headers = new Headers();
      headers.append("Accept", "application/json");

      const setting = {
        method: "GET",
        headers: headers,
      };
      try {
        let res = await fetch("/api/categories", setting);
        let json = await res.json();

        const { data } = json;

        setAllCategories(data);
        setIsLoading(false);
      } catch (err) {
        getCategoriesAPI();

        console.log(err);
      }
    };

    getCategoriesAPI();
  }, []);

  return (
    <Router>
      <ScrollToTop />

      <ThemeProvider theme={theme}>
        <OrderNotificationPopUp
          message={orderActualizationMessage}
          notificationCount={actualizationCount}
          close={closeActualizationNotification}
        />
        <OrderNotificationPopUp
          message="Nuevos Pedidos"
          notificationCount={newOrdersCount}
          close={closeNewOrderNotification}
        />
        <SuccessfulFormModal />
        <LoadingPage />
        <ShoppingCart />
        <Header />

        <Suspense fallback={<LoadingPage isLoading={true} />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/menu" exact component={Menu} />

            <Route path="/authentication/login" exact component={Login} />
            <Route path="/authentication/singUp" exact component={SignUp} />
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
                <UserOrdersPage closeNotification={closeNewOrderNotification} />
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
                <DashboardOrders
                  closeNotification={closeActualizationNotification}
                />
              )}
            />
            <PrivateRoute
              path="/dashboard/orders/:orderID"
              component={DashboardOrderDetails}
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
