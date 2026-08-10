import api from "./api";


// ============================================
// GET MOCK TEST
// ============================================

export const getMockTestBySubject = async (
    testId,
    levelId,
    numberOfQuestions
) => {
    try {

        const response = await api.get(
            `/Exam/by-subject/${testId}?levelId=${levelId}&numberOfQuestions=${numberOfQuestions}`);

        return response.data;

    } catch (error) {

        console.error(
            "Error fetching mock test:",
            error
        );

        throw error;
    }
};


// ============================================
// SUBMIT EXAM
// ============================================

export const submitExam = async (payload) => {
    try {

        const response = await api.post(
            "/Exam/submit",
            payload
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error submitting exam:",
            error
        );

        throw error;
    }
};


// ============================================
// RESULT ANALYSIS
// ============================================

export const getResultAnalysis = async (attemptId) => {
    try {

        const response = await api.get(
            `/Exam/result/${attemptId}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error fetching result analysis:",
            error
        );

        throw error;
    }
};