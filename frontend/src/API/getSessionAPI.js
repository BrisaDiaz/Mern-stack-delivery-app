import { GET } from "../utils/http";

async function getSessionAPI(onSuccess, onError) {
  try {
    const { json } = await GET("/api/auth/session");
    if (json.token) {
      return onSuccess(json);
    }
    onError(json);
  } catch (err) {
    console.log(err);
    onError(err);
  }
}

export default getSessionAPI;
