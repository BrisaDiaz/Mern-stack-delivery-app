import updateProductAPI from "../API/updateProductAPI";
import { useForm } from "react-hook-form";
import { useStorage } from "../context/useStorage";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function useEditProductForm() {
  const {
    token,
    productToEdit,
    setIsSuccessfullySend,
    setAllCategories,
    categories,
  } = useStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const history = useHistory();

  const [formIsLoading, setFormIsLoading] = useState(false);

  let id = productToEdit._id;

  function onSubmit(data, e) {
    setFormIsLoading(true);
    e.preventDefault();

    const formData = new FormData();

    let img = data?.img?.length ? data?.img[0] : undefined;
    const price = parseInt(data.price);

    formData.append("img", img);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("size", data.size);
    formData.append("description", data.description);
    formData.append("price", price);
    formData.append("active", e.target.state.checked);

    updateProductAPI({
      token,
      formData,
      id,
      setIsSuccessfullySend,
      setFormIsLoading,
      setAllCategories,
      history,
    });
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    formIsLoading,
    productToEdit,
    categories,
  };
}
