import { GET } from "../utils/http";
export default async function getSessionAPI(handleSession) {
  try {
    const { json } = await GET("/api/auth/session");
    handleSession(json);
  } catch (err) {
    console.log(err);
  }
}
