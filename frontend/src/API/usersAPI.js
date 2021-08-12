import { GET } from "../utils/http";
async function getUsers({ token, setAllUsers }) {
  try {
    const { json } = await GET("/api/users", token);

    setAllUsers(json);
  } catch (err) {
    console.log(err);
  }
}

export default getUsers;
