import { useReducer, useEffect } from "react";
import AppContext from "./app-context";
import appReducer from "./app-reducer";
import getSessionAPI from "../API/getSessionAPI";
import usersAPI from "../API/usersAPI";
import getCategoryAPI from "../API/getCategoriesAPI";
import {
  SET_IS_LOADING,
  SET_ALL_USERS,
  SET_ALL_CATEGORIES,
  SET_CURRENT_USER,
  SET_TOKEN,
  SET_PRODUCT_TO_EDIT,
  SET_IS_LOGIN_TRUE,
  SET_IS_LOGIN_FALSE,
  SET_IS_ADMIN,
  SET_IS_MODERATOR,
  SET_FORM_DATA_SUCCESFULLY_SEND,
} from "./app-actions";

export default function AppState(props) {
  useEffect(() => {
    setIsLoading(true);
    async function handleSession(data) {
      if (data.loggedIn) {
        setCurrentUser(data.user);
        setToken(data.token);

        if (data.user.roles[0].name === "admin") {
          setIsAdmin(true);

          await usersAPI({ token: data.token, setAllUsers });
        }
        if (data.user.roles[0].name === "moderator") {
          setIsModerator(true);
        }

        setIsLogin();
      }
      await getCategoryAPI(setAllCategories);
    }
    getSessionAPI(handleSession);
    setIsLoading(false);
  }, []);

  const initialState = {
    users: [],
    categories: [],
    currentUser: {},
    token: "",
    isLoading: true,
    productToEdit: {},
    isSingUp: false,
    isLogin: false,
    isAdmin: false,
    isModerator: false,
    isSuccessfullySend: false,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const setIsLoading = (boolean) => {
    dispatch({
      type: SET_IS_LOADING,
      payload: boolean,
    });
  };
  const setAllUsers = (data) => {
    dispatch({
      type: SET_ALL_USERS,
      payload: data,
    });
  };

  const setAllCategories = (data) => {
    dispatch({
      type: SET_ALL_CATEGORIES,
      payload: data,
    });
  };
  const setCurrentUser = (data) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: data,
    });
  };
  const setToken = (token) => {
    dispatch({
      type: SET_TOKEN,
      payload: token,
    });
  };

  const setProductToEdit = (product) => {
    dispatch({
      type: SET_PRODUCT_TO_EDIT,
      payload: product,
    });
  };

  const setIsLogin = () => {
    dispatch({
      type: SET_IS_LOGIN_TRUE,
    });
  };
  const setIsNotLogin = () => {
    dispatch({
      type: SET_IS_LOGIN_FALSE,
    });
  };
  const setIsAdmin = (bulean) => {
    dispatch({
      type: SET_IS_ADMIN,
      payload: bulean,
    });
  };
  const setIsModerator = (bulean) => {
    dispatch({
      type: SET_IS_MODERATOR,
      payload: bulean,
    });
  };

  const setIsSuccessfullySend = (bulean) => {
    dispatch({
      type: SET_FORM_DATA_SUCCESFULLY_SEND,
      payload: bulean,
    });
  };
  return (
    <AppContext.Provider
      value={{
        isLoading: state.isLoading,
        users: state.users,
        orders: state.orders,
        categories: state.categories,
        currentUser: state.currentUser,
        token: state.token,
        productToEdit: state.productToEdit,
        isLogin: state.isLogin,
        isAdmin: state.isAdmin,
        isModerator: state.isModerator,
        isSuccessfullySend: state.isSuccessfullySend,
        setIsLoading,
        setToken,
        setAllUsers,
        setCurrentUser,
        setAllCategories,
        setProductToEdit,
        setIsLogin,
        setIsNotLogin,
        setIsAdmin,
        setIsModerator,
        setIsSuccessfullySend,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
