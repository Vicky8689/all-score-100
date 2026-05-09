import axios from "axios";

const API_BASE_URL = "https://localhost:7010/api/Common";

// Get Courses
export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Get Facts
export const getFacts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/facts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching facts:", error);
    throw error;
  }
};