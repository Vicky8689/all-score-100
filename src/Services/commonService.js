import api from "./api";

export const getCourses = async () => {
  try {
    const response = await api.get("/Common/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getFacts = async () => {
  try {
    const response = await api.get("/Common/facts");
    return response.data;
  } catch (error) {
    console.error("Error fetching facts:", error);
    throw error;
  }
};
