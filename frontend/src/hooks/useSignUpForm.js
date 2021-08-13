import { useForm } from "react-hook-form";
import signUpAPI from "../API/signUpAPI";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function useSingupForm() {
  const [serverError, setServerError] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const history = useHistory();

  async function onSubmit(data, e) {
    e.preventDefault();

    await setIsFormLoading(true);

    const info = {
      name: data.userName.toLowerCase(),
      lastName: data.userLastName.toLowerCase(),
      email: data.userEmail,
      password: data.userPassword,
    };

    await signUpAPI({
      setServerError,
      info,
      history,
      setIsFormLoading,
    });
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    serverError,
    isFormLoading,
  };
}
