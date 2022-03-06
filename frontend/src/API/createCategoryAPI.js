import { POST } from "../utils/http";

async function createCategoryAPI({ token, info, onSuccess }) {
  try {
    const { json } = await POST("/api/categories", info, token);

    if (json.category) {
      return onSuccess(json);
    }
  } catch (err) {
    console.log(err);
  }
}
export default createCategoryAPI;
