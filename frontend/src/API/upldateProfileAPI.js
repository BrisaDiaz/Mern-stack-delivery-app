import currentUserAPI from "./currentUserAPI";
import usersAPI from "./usersAPI";
import { PUT } from "../utils/http";

async function UploadProfileAPI({
  setFormIsLoading,
  setIsSuccessfullySend,
  setServerError,
  info,
  isAdmin,
  setAllUsers,
  token,
  setCurrentUser,
  history,
}) {
  try {
    setFormIsLoading(true);
    setServerError("");

    const id = localStorage.getItem("userId");

    const { response, json } = await PUT(`/api/users/me/${id}`, info, token);

    setFormIsLoading(false);

    if (response.status === 200) {
      isAdmin && (await usersAPI({ token, setAllUsers }));

      await currentUserAPI({ token, setCurrentUser });

      setIsSuccessfullySend(true);
      setTimeout(() => {
        setIsSuccessfullySend(false);

        history.push("/myAccount/myProfile");
      }, 3000);

      return;
    }

    setServerError(json.message);
  } catch (err) {
    console.log(err);
  }
}

export default UploadProfileAPI;
