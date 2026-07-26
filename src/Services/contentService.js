import api from "./api";

export const GetBySubjectOptionById = async (optionId) => {
  try {
    const response = await api.get(`/Content/by-option/${optionId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNotesPdf = async (optionTopicId, srNo) => {
  try {
    const response = await api.get(`/Content/LecturePdf/${optionTopicId}/${srNo}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLectureVideo = async (optionTopicId) => {
  try {
    const response = await api.get(`/Content/LectureVideo/${optionTopicId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
