import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStorage } from "../context/useStorage";
import deleteProductAPI from "../API/deleteProductAPI";

export default function useDashboardProducts() {
  const history = useHistory();
  const location = useLocation();

  const { categories, token, setProductToEdit } = useStorage();

  let populatedCategories = categories?.filter(
    (category) => category?.quantity > 0
  );

  let sizeLimit = 6;

  const [oldQuery, setOldQuery] = useState(
    new URLSearchParams(location.search)
  );
  const [page, setPage] = useState(oldQuery.get("page") || 1);
  const [category, setCategory] = useState(oldQuery.get("category") || "all");
  const [sorting, setSorting] = useState(oldQuery.get("sort") || "-createdAt");
  const [title, setTitle] = useState(oldQuery.get("title") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [products, setProducts] = useState(null);
  const [activeProducts, setActiveProducts] = useState(
    oldQuery.get("active") || "all"
  );
  const [isFirstRender, setIsFirstRender] = useState(true);

  let query;

  if (isFirstRender) {
    query = new URLSearchParams(oldQuery.toString());
  } else {
    query = new URLSearchParams();
    query.append("sort", sorting);
    query.append("page", page);
    query.append("limit", sizeLimit);
  }

  useEffect(() => {
    if (title !== "") {
      query.append("title", title);
      setActiveProducts("all");
      setCategory("all");
    }

    if (category !== "all") {
      query.append("category", category);
    }

    if (activeProducts !== "all") {
      query.append("active", activeProducts);
    }
    setPage(1);
  }, [title, category, activeProducts, sorting]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const productsAPI = async () => {
      setIsLoading(true);
      try {
        let res = await fetch(`/api/products?${query}`, { signal });
        let json = await res.json();

        setProducts(json.data);

        let total = parseInt(json.total);

        setMaxPage(Math.ceil(total / sizeLimit));

        history.push(`/dashboard/myProducts?${query}`);
        document.querySelector("body").scrollTo(0, 100);

        setIsFirstRender(false);
        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch Canseled: caught abort");
        } else {
          console.log(err);
        }
      }
    };

    productsAPI();
    return () => {
      controller.abort();
    };
  }, [title, activeProducts, page, category, sizeLimit]);

  const handleEdit = (product) => {
    setProductToEdit(product);

    return history.push("/dashboard/editProduct");
  };

  const handleDelete = async (id) => {
    await deleteProductAPI(token, id, setProducts);
  };
  return {
    populatedCategories,
    isLoading,
    page,
    maxPage,
    products,
    setCategory,
    setTitle,
    handleEdit,
    handleDelete,
    setPage,
    setActiveProducts,
    setProducts,
    isFirstRender,
    sorting,
    category,
    activeProducts,
    title,
  };
}
