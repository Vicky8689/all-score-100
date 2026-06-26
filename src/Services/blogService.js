import axios from "axios";

const API_URL = "https://localhost:7010/api/Blog";

export const GetBlogById = async (blogId) => {
  try {
    const response = await axios.get(`${API_URL}/${blogId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
