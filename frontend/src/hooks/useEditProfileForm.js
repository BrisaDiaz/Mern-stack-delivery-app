import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useStorage } from "../context/useStorage";
import updateProfileAPI from "../API/updateProfileAPI";

export default function useEditProfileForm() {
  const {
    token,
    setCurrentUser,
    setAllUsers,
    isAdmin,
    setIsSuccessfullySend,
    currentUser,
  } = useStorage();

  const [serverError, setServerError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);

  const defaultsValues = {
    name: currentUser.name.split(" ")[0],
    lastName: currentUser.name.split(" ")[1],
    street: currentUser.address.split(",")[0].split(" ").slice(0, -1).join(" "),
    streetNumber: currentUser.address.split(",")[0].split(" ").splice(-1),
    number: currentUser.number,
    city: currentUser.address.split(",")[1].trim(),
  };

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  async function onSubmit(data, e) {
    e.preventDefault();

    const name = data.userName?.toLowerCase(),
      lastName = data.userLastName?.toLowerCase(),
      city = data.userCityAddress?.toLowerCase(),
      street = data.userStreetAddress?.toLowerCase();

    const info = {
      name,
      lastName,
      password: data.userPassword || null,
      newPassword: data.userNewPassword || null,
      number: data.userNumber,
      city,
      street,
      streetNumber: data.userStreetNumber,
    };
    await updateProfileAPI({
      setFormIsLoading,
      setCurrentUser,
      setIsSuccessfullySend,
      setServerError,
      info,
      isAdmin,
      setAllUsers,
      token,
      history,
    });
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    serverError,

    formIsLoading,
    defaultsValues,
    isChangingPassword,
    setIsChangingPassword,
  };
}
