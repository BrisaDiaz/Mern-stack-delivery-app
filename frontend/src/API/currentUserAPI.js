import { GET } from "../utils/http";
async function getCurrentUser({ setCurrentUser, token }) {
  const id = localStorage.getItem("userId");

  try {
    const { json } = await GET(`/api/users/me/${id}`, token);

    setCurrentUser(json.data);
  } catch (err) {
    console.log(err);
  }
}

export default getCurrentUser;
