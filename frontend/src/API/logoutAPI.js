import { GET } from "../utils/http";

async function logoutAPI(onSuccess, onError) {
  try {
    const { json } = await GET("/api/auth/logout");

    return onSuccess(json);
  } catch (err) {
    console.log(err);
    onError(err);
  }
}

export default logoutAPI;
