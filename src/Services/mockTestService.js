import api from "./api";

export const getMockTestBySubject = async (testId) => {
  try {
    const response = await api.get(`/Exam/by-subject/${testId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mock test:", error);
    throw error;
  }
};

export const submitExam = async (payload) => {
  try {
    const response = await api.post("/Exam/submit", payload);
    return response.data;
  } catch (error) {
    console.error("Error submitting exam:", error);
    throw error;
  }
};

export const getResultAnalysis = async (attemptId) => {
  try {
    const response = await api.get(`/Exam/result/${attemptId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching result analysis:", error);
    throw error;
  }
};
