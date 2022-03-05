import { useReducer } from "react";
import AppContext from "./app-context";
import appReducer from "./app-reducer";

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
  SET_FORM_DATA_SUCCESSFULLY_SEND,
} from "./app-actions";

export default function AppState(props) {
  const initialState = {
    users: [],
    categories: [],
    currentUser: {},
    token: "",
    isLoading: true,
    productToEdit: {},
    isSignUp: false,
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
  const setIsAdmin = (boolean) => {
    dispatch({
      type: SET_IS_ADMIN,
      payload: boolean,
    });
  };
  const setIsModerator = (boolean) => {
    dispatch({
      type: SET_IS_MODERATOR,
      payload: boolean,
    });
  };

  const setIsSuccessfullySend = (boolean) => {
    dispatch({
      type: SET_FORM_DATA_SUCCESSFULLY_SEND,
      payload: boolean,
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
