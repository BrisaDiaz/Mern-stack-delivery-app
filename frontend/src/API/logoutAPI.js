import { POST } from "../utils/http";
export default async function logoutAPI() {
  try {
    await POST("auth/logout", {});
  } catch (err) {
    console.log(err);
  }
}
