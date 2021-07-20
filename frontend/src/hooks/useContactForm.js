import { useForm } from "react-hook-form";
import contactAPI from "../API/contactAPI.js";

export default function useContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  async function onSubmit(data, e) {
    e.preventDefault();

    const info = {
      userName: data.userName,
      userEmail: data.userEmail,
      userMessage: data.userMessage,
      subject: data.subject,
    };

    await contactAPI({ info, e });
  }

  return { register, handleSubmit, errors, onSubmit };
}
