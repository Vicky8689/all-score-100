import axios from "axios";

const API_URL = "https://localhost:7010/api/Courses";

export const GetCoursesSubjectsById = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/coursesDetails/${courseId}`);
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};