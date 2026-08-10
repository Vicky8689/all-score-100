
import React from "react";
import MathText from "../Math/MathText";

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
                    {question.question}
                </MathText>

            </div>


            {/* ==================================================
                OPTIONS
            ================================================== */}

            <div className="options-container">

                {question.options?.map(
                    (option, optionIndex) => {

                        // ------------------------------------------
                        // Check selected option
                        // ------------------------------------------

                        const isSelected =
                            selectedOption === optionIndex;

                        // ------------------------------------------
                        // Empty option
                        // ------------------------------------------

                        const isEmpty =
                            option === null ||
                            option === undefined ||
                            String(option).trim() === "";

                        return (
                            <div
                                key={optionIndex}
                                className={`option-item ${
                                    isSelected
                                        ? "border-primary"
                                        : ""
                                }`}
                                onClick={() => {

                                    // Don't select empty options
                                    if (isEmpty) {
                                        return;
                                    }

                                    onSelect(
                                        question.id,
                                        optionIndex
                                    );
                                }}
                                style={{
                                    cursor: isEmpty
                                        ? "default"
                                        : "pointer",

                                    display: "flex",
                                    alignItems: "flex-start"
                                }}
                            >

                                {/* ==================================================
                                    RADIO
                                ================================================== */}

                                <div
                                    className="radio-circle"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        border: isSelected
                                            ? "2px solid #8b5cf6"
                                            : "2px solid #cbd5e1",
                                        borderRadius: "50%",
                                        marginRight: "12px",
                                        marginTop: "4px",
                                        flexShrink: 0,
                                        position: "relative"
                                    }}
                                >

                                    {isSelected && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                width: "10px",
                                                height: "10px",
                                                borderRadius: "50%",
                                                background: "#8b5cf6",
                                                top: "3px",
                                                left: "3px"
                                            }}
                                        />
                                    )}

                                </div>


                                {/* ==================================================
                                    OPTION LETTER
                                ================================================== */}

                                <div
                                    style={{
                                        marginRight: "8px",
                                        fontWeight: "500",
                                        flexShrink: 0
                                    }}
                                >
                                    {String.fromCharCode(
                                        65 + optionIndex
                                    )}.
                                </div>


                                {/* ==================================================
                                    OPTION CONTENT
                                ================================================== */}

                                <div
                                    style={{
                                        flex: 1,
                                        minWidth: 0,
                                        overflow: "hidden"
                                    }}
                                >

                                    {isEmpty ? (
                                        <span
                                            style={{
                                                color: "#94a3b8"
                                            }}
                                        >
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
