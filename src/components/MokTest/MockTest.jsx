import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "What is React?",
    options: ["A framework", "A library", "A language", "A database"],
    answer: "A library",
  },
  {
    question: "Which hook is used for state management?",
    options: ["useEffect", "useContext", "useState", "useReducer"],
    answer: "useState",
  },
  {
    question: "What is JSX?",
    options: ["A syntax extension", "A CSS framework", "A database", "A state manager"],
    answer: "A syntax extension",
  },
];

export default function MockTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 p-6 shadow-lg rounded-2xl">
        <CardContent>
          {!showScore ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full p-2 rounded-md border ${
                      selectedOption === option
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <Button
                className="mt-4 w-full"
                onClick={nextQuestion}
                disabled={!selectedOption}
              >
                {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
              </Button>
            </>
          ) : (
            <h2 className="text-xl font-bold text-center">
              Your Score: {score} / {questions.length}
            </h2>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
