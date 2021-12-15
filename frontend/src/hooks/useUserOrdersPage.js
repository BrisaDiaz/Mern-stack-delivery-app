import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStorage } from "../context/useStorage";
import deleteOrderAPI from "../API/deleteOrderAPI";

export default function useUserOrdersPage({ closeNotification }) {
  const history = useHistory();
  const { token, setIsLoading, currentUser } = useStorage();

  ////redirects to order details page with order id as url parameter

  const seeDetails = (orderID) => {
    setIsLoading(true);
    history.push(`/myAccount/myOrders/${orderID}`);
  };
  const deleteOrder = async (e, id) => {
    e.stopPropagation();

    if (!e.target.disabled) {
      setIsLoadingPage(true);
      await deleteOrderAPI({ token, id });
      handleRefresh();
    }
  };

  let query = new URLSearchParams();
  let sizeLimit = 5;

  const [isLoading, setIsLoadingPage] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  let [refreshCount, setRefreshCount] = useState(0);

  ///add  search params to the url query

  query.append("page", page);
  query.append("limit", sizeLimit);
  query.append("sort", "-createdAt");

  ////get all user orders

  useEffect(() => {
    closeNotification();
    const controller = new AbortController();
    const signal = controller.signal;

    const ordersAPI = async () => {
      setIsLoadingPage(true);

      try {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        const setting = {
          method: "GET",
          headers: headers,
          signal,
        };

        let res = await fetch(
          `/api/orders/user/${currentUser._id}?${query}`,
          setting
        );
        let json = await res.json();

        setOrders(json.data);

        let total = parseInt(json.total);

        setMaxPage(Math.ceil(total / sizeLimit));

        document.querySelector("body").scrollTo(0, 60);
        setIsFirstRender(false);
        setIsLoadingPage(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch Canseled: caught abort");
        } else {
          console.log(err);
        }
      }
    };

    ordersAPI();

    return () => {
      controller.abort();
    };
  }, [page, refreshCount]);

  const handleRefresh = () => {
    setRefreshCount(Date.now());
    setPage(1);
  };

  return {
    seeDetails,
    handleRefresh,
    setPage,
    page,
    isLoading,
    maxPage,
    orders,
    isFirstRender,
    deleteOrder,
  };
}
