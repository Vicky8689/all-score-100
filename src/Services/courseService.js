import api from "./api";

export const GetCoursesSubjectsById = async (courseId) => {
  try {
    const response = await api.get(`/Courses/coursesDetails/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
