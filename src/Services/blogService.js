import api from "./api";

export const GetBlogById = async (blogId) => {
  try {
    const response = await api.get(`/Blog/${blogId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
