import { useForm } from "react-hook-form";
import singUpAPI from "../API/singUpAPI";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function useSignupForm() {
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

    await singUpAPI({
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
