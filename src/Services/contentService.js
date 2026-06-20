import axios from "axios";

const API_URL = "https://localhost:7010/api/Content";

export const GetBySubjectOptionById = async (optionId) => {
  try {
    const response = await axios.get(`${API_URL}/by-option/${optionId}`);
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNotesPdf = async (optionTopicId, srNo) => {
  try {
    const response = await axios.get(`${API_URL}/LecturePdf/${optionTopicId}/${srNo}`);
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};