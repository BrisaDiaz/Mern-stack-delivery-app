import { GET } from "../utils/http";

export default async function getCategoryAPI(setAllCategories) {
  try {
    const { json } = await GET("/api/categories");
    setAllCategories(json.data);
  } catch (err) {
    console.log(err);
  }
}
