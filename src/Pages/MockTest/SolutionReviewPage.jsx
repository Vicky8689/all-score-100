import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import { getMockTestBySubject } from "../../Services/mockTestService";
import SolutionCard from "../../components/MockTest/SolutionCard";
import { ArrowBack } from "@mui/icons-material";

const SolutionReviewPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`last_answers_${testId}`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    
    const fetchTest = async () => {
      try {
        const testData = await getMockTestBySubject(testId);
        setTest(testData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [testId]);

  if (loading) return <div className="vh-100 d-flex align-items-center justify-content-center"><Spinner animation="border" /></div>;
  if (!test) return <div className="text-center mt-5">No test data found.</div>;

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container style={{ maxWidth: '900px' }}>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <Button variant="link" onClick={() => navigate(-1)} className="text-dark p-0 text-decoration-none d-flex align-items-center">
            <ArrowBack className="me-2" /> Back to Results
          </Button>
          <h2 className="fw-bold mb-0">Solution Review</h2>
        </div>

        {test.questions.map((q, i) => {
          const userAns = answers ? answers[q.id] : null;
          const isCorrect = userAns === q.correctAnswer;
          return (
            <SolutionCard 
              key={q.id}
              question={q}
              index={i}
              userAnswer={userAns}
              isCorrect={isCorrect}
            />
          );
        })}

        <div className="text-center mt-5">
          <Button variant="primary" size="lg" className="px-5 fw-bold" onClick={() => navigate(`/home`)}>
             Go to Home Dashboard
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default SolutionReviewPage;
