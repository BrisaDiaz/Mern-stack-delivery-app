import { useForm } from "react-hook-form";
import { useStorage } from "../context/useStorage";
import newsletterSubscribtionAPI from "../API/newsletterSubscribtionAPI";

export default function useNewsletterForm() {
  const { setIsSuccessfullySend, isLogin } = useStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  function onSubmit(data, e) {
    e.preventDefault();

    const info = { email: e.target.userEmail.value };

    isLogin
      ? newsletterSubscribtionAPI({ info, setIsSuccessfullySend })
      : alert("Para poder subscribirse es necesario que inicie seción");
  }

  return { register, handleSubmit, errors, onSubmit };
}
