import usersAPI from "./usersAPI";
import currentUserAPI from "./currentUserAPI";
import { POST } from "../utils/http";
async function loginAPI({
  info,
  setIsLoading,
  setServerError,
  setIsLogin,
  setToken,
  setIsAdmin,
  history,
  setCurrentUser,
  setAllUsers,
  setIsFormLoading,
  setIsModerator,
}) {
  try {
    setIsFormLoading(true);

    const { response, json } = await POST("/api/auth/login", info);

    const { message } = json;
    setIsFormLoading(false);

    if (response.status === 200) {
      setServerError("");

      setIsLoading(true);
      const { token, roles, user } = json;

      await setToken(token);

      localStorage.setItem("userId", user._id);

      await currentUserAPI({ setCurrentUser, token });

      setIsLogin();

      if (roles[0].name === "admin") {
        setIsAdmin(true);

        await usersAPI({ setAllUsers, token });

        setIsLoading(false);

        return history.push("/dashboard/orders");
      }
      if (roles[0].name === "moderator") {
        setIsModerator(true);
        setIsLoading(false);
        return history.push("/dashboard/myProducts");
      }

      setIsLoading(false);
      return history.push("/menu");
    }

    if (response.status === 302) {
      const { redirect, id } = json;

      localStorage.setItem("toConfirmUser", id);

      setTimeout(() => {
        return history.push(redirect);
      }, 1000);
    }

    setServerError(message);
  } catch (err) {
    console.log(err);
  }
}
export default loginAPI;
