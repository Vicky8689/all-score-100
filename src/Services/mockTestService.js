import axios from "axios";

const API_URL = "https://localhost:7010/api/Exam";

export const getMockTestBySubject = async (testId) => {
  try {
    const response = await axios.get(`${API_URL}/by-subject/${testId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mock test:", error);
    throw error;
  }
};

export const submitExam = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/submit`, payload);
    return response.data;
  } catch (error) {
    console.error("Error submitting exam:", error);
    throw error;
  }
};

export const getResultAnalysis = async (attemptId) => {
  try {
    const response = await axios.get(`${API_URL}/result/${attemptId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching result analysis:", error);
    throw error;
  }
};
