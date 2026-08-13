
import React from "react";
import MathText from "../Math/MathText";
import "./QuestionCard.css";

const QuestionCard = ({
    question,
    index,
    totalQuestions,
    selectedOption,
    onSelect
}) => {

    // ======================================================
    // SAFETY CHECK
    // ======================================================

    if (!question) {
        return null;
    }

    return (
        <div>

            {/* ==================================================
                QUESTION NUMBER
            ================================================== */}

            <div className="mb-3">
                <span className="badge bg-primary">
                    Question {index + 1} of {totalQuestions}
                </span>
            </div>


            {/* ==================================================
                QUESTION
            ================================================== */}

            <div className="question-text mb-4">

                <MathText
                    className="question-text-content"
                >
                  {index + 1} ___ {question.question}
                </MathText>

            </div>


            {/* ==================================================
                OPTIONS
            ================================================== */}

            <div className="options-container">

                {question.options?.map(
                    (option, optionIndex) => {

                        const isSelected =
                            selectedOption === optionIndex;

                        const isEmpty =
                            option === null ||
                            option === undefined ||
                            String(option).trim() === "";

                        return (
                            <div
                                key={optionIndex}
                                className={`option-item ${
                                    isSelected
                                        ? "selected"
                                        : ""
                                } ${isEmpty ? "empty-option" : ""}`}
                                onClick={() => {

                                    if (isEmpty) {
                                        return;
                                    }

                                    onSelect(
                                        question.id,
                                        optionIndex
                                    );
                                }}
                            >

                                {/* RADIO */}

                                <div className="radio-circle">

                                    {isSelected && (
                                        <div className="radio-inner" />
                                    )}

                                </div>


                                {/* OPTION LETTER */}

                                <div className="option-letter">
                                    {String.fromCharCode(
                                        65 + optionIndex
                                    )}.
                                </div>


                                {/* OPTION CONTENT */}

                                <div className="option-content">

                                    {isEmpty ? (
                                        <span className="empty-text">
                                            No option provided
                                        </span>
                                    ) : (
                                        <MathText
                                            className="option-text-content"
                                        >
                                            {option}
                                        </MathText>
                                    )}

                                </div>

                            </div>
                        );
                    }
                )}

            </div>

        </div>
    );
};

export default QuestionCard;
