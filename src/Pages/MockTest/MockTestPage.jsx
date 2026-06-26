import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMockTestBySubject, submitExam } from "../../Services/mockTestService";
import { useTimer } from "../../hooks/useTimer";
import { useMockTest } from "../../hooks/useMockTest";
import { Container, Spinner, Button } from "react-bootstrap";
import Timer from "../../components/MockTest/Timer";
import QuestionCard from "../../components/MockTest/QuestionCard";
import QuestionNavigator from "../../components/MockTest/QuestionNavigator";
import SubmitModal from "../../components/MockTest/SubmitModal";
import { toast } from "react-toastify";

const MockTestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await getMockTestBySubject(testId);
        setTest(data);
      } catch (err) {
        console.error("Failed to load exam:", err);
        toast.error("Failed to load the examination content.");
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [testId]);

  const onTimeUp = () => {
    handleFinalSubmit();
  };

  const { timeLeft, formatTime } = useTimer(test?.durationInMinutes || 10, onTimeUp);
  
  const {
    answers,
    status,
    currentQuestionIndex,
    handleAnswer,
    markForReview,
    clearAnswer,
    visitQuestion,
    getFormattedAnswers
  } = useMockTest(testId, test?.questions || []);

  const studentName = user?.userName || "Student";
  const userId = user?.userID || 101;

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        examId: parseInt(test.id),
        userId: userId,
        answers: getFormattedAnswers()
      };

      const result = await submitExam(payload);
      
      if (result && result.attemptId) {
        // Clear local progress on successful submit
        localStorage.removeItem(`mock_test_${testId}`);
        // Store answers temporarily for solutions review if backend doesn't provide them yet
        localStorage.setItem(`last_answers_${testId}`, JSON.stringify(answers));
        
        navigate(`/mock-test/${testId}/result/${result.attemptId}`);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Failed to submit your exam. Please try again.");
    } finally {
      setSubmitting(false);
      setShowSubmitModal(false);
    }
  };

  if (loading) return <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
    <Spinner animation="border" variant="primary" className="mb-3" />
    <p className="text-muted fw-bold">Loading Examination Content...</p>
  </div>;

  const currentQuestion = test.questions[currentQuestionIndex];
  
  const submitSummary = {
    answered: Object.values(status || {}).filter(s => s === 'answered').length,
    review: Object.values(status || {}).filter(s => s === 'review').length,
    notVisited: (test.questions?.length || 0) - Object.values(status || {}).filter(s => s !== 'not-visited').length
  };

  return (
    <div className="modern-exam-container py-5">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');

        .modern-exam-container {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
        }

        /* Glassmorphism Card style */
        .modern-glass-card {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(255, 255, 255, 0.7) !important;
          border-radius: 20px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .card.border-0.shadow-sm {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(255, 255, 255, 0.7) !important;
          border-radius: 20px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
          padding: 1.75rem !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        /* Header customization */
        .modern-header {
          border-left: 6px solid #6366f1 !important;
          padding: 1.25rem 1.75rem !important;
        }

        .modern-header h5 {
          color: #1e293b !important;
          font-weight: 700 !important;
          letter-spacing: -0.02em !important;
        }

        /* Option Items styling overrides */
        .option-item {
          border: 2px solid #e2e8f0 !important;
          border-radius: 14px !important;
          padding: 1.1rem 1.25rem !important;
          margin-bottom: 0.95rem !important;
          font-weight: 550 !important;
          font-size: 0.95rem !important;
          color: #334155 !important;
          background: #ffffff !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01) !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .option-item:hover {
          background-color: #f8fafc !important;
          border-color: #cbd5e1 !important;
          transform: translateY(-2px) !important;
        }

        /* Selected option style */
        .option-item.border-primary {
          background: #f5f3ff !important;
          border-color: #8b5cf6 !important;
          color: #4c1d95 !important;
        }

        /* Radio circle replacements */
        .radio-circle {
          transition: all 0.2s ease !important;
        }

        .option-item.border-primary .radio-circle {
          border-color: #8b5cf6 !important;
          background-color: #8b5cf6 !important;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15) !important;
        }

        /* Question Navigator overrides */
        .card .btn-sm.rounded-circle {
          width: 38px !important;
          height: 38px !important;
          font-family: 'JetBrains Mono', monospace !important;
          font-weight: 700 !important;
          font-size: 0.85rem !important;
          border-radius: 10px !important;
          transition: all 0.2s ease !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .card .btn-sm.rounded-circle.border-dark {
          border: 3px solid #6366f1 !important;
          transform: scale(1.1) !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2) !important;
        }

        .card .btn-sm.rounded-circle.bg-success {
          background-color: #10b981 !important;
          color: #ffffff !important;
        }

        .card .btn-sm.rounded-circle.bg-warning {
          background-color: #f59e0b !important;
          color: #ffffff !important;
        }

        .card .btn-sm.rounded-circle.bg-danger {
          background-color: #ef4444 !important;
          color: #ffffff !important;
        }

        .card .btn-sm.rounded-circle.bg-light {
          background-color: #f1f5f9 !important;
          color: #64748b !important;
          border: 1px solid #e2e8f0 !important;
        }

        /* Timer overrides */
        .sticky-top .d-flex.align-items-center.p-3.rounded,
        .d-lg-none .d-flex.align-items-center.p-3.rounded {
          border-radius: 16px !important;
          padding: 1rem 1.5rem !important;
          border: 1px solid rgba(255, 255, 255, 0.7) !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04) !important;
        }

        .sticky-top .d-flex.align-items-center.p-3.rounded.bg-white,
        .d-lg-none .d-flex.align-items-center.p-3.rounded.bg-white {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #1e293b !important;
          border-left: 4px solid #10b981 !important;
        }

        .sticky-top .d-flex.align-items-center.p-3.rounded.bg-danger,
        .d-lg-none .d-flex.align-items-center.p-3.rounded.bg-danger {
          background: linear-gradient(135deg, #ef4444, #dc2626) !important;
          color: #ffffff !important;
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3) !important;
          animation: pulseWarning 1.5s infinite alternate !important;
        }

        .sticky-top h4, .d-lg-none h4 {
          font-family: 'JetBrains Mono', monospace !important;
          font-weight: 700 !important;
          letter-spacing: -0.05em !important;
          font-size: 1.5rem !important;
        }

        /* Button UI elements */
        .btn-modern-prev-next {
          border-radius: 12px !important;
          padding: 0.65rem 1.25rem !important;
          font-weight: 600 !important;
          transition: all 0.2s ease !important;
          border: 2px solid #e2e8f0 !important;
          background: white !important;
          color: #475569 !important;
        }

        .btn-modern-prev-next:hover:not(:disabled) {
          background: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          color: #1e293b !important;
          transform: translateY(-1px) !important;
        }

        .btn-modern-submit {
          border-radius: 12px !important;
          padding: 0.65rem 1.75rem !important;
          font-weight: 700 !important;
          border: none !important;
          background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
          color: white !important;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35) !important;
          transition: all 0.2s ease !important;
        }

        .btn-modern-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #4f46e5, #4338ca) !important;
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45) !important;
          transform: translateY(-2px) !important;
        }

        .btn-modern-review {
          border-radius: 12px !important;
          padding: 0.65rem 1.25rem !important;
          font-weight: 600 !important;
          border: 2px solid #f59e0b !important;
          color: #d97706 !important;
          background: transparent !important;
          transition: all 0.2s ease !important;
        }

        .btn-modern-review:hover {
          background: #fef3c7 !important;
          color: #b45309 !important;
          transform: translateY(-1px) !important;
        }

        .btn-modern-clear {
          color: #ef4444 !important;
          font-weight: 600 !important;
          transition: all 0.2s ease !important;
          opacity: 0.85 !important;
        }

        .btn-modern-clear:hover {
          opacity: 1 !important;
          text-decoration: underline !important;
        }

        @keyframes pulseWarning {
          0% { transform: scale(1); }
          100% { transform: scale(1.02); }
        }
      `}} />
      <Container fluid className="px-lg-5">
        <div className="row g-4">
          <div className="col-lg-8 col-xl-9">
            <div className="d-flex flex-column h-100">
               <div className="mb-4 d-lg-none">
                  <Timer formatTime={formatTime} timeLeft={timeLeft} />
               </div>

               <div className="d-flex justify-content-between align-items-center modern-glass-card modern-header mb-4">
                  <div>
                    <h5 className="fw-bold mb-1 text-primary">{test.title}</h5>
                    <span className="text-muted small">Candidate Name: <strong className="text-dark">{studentName}</strong></span>
                  </div>
                  <div className="text-end">
                    <span className="text-muted small">Candidate ID: <strong className="text-dark">{userId}</strong></span>
                  </div>
               </div>

               <QuestionCard 
                question={currentQuestion}
                index={currentQuestionIndex}
                totalQuestions={test.questions.length}
                selectedOption={answers[currentQuestion.id]}
                onSelect={handleAnswer}
               />

               <div className="mt-4 d-flex flex-wrap gap-2 justify-content-between align-items-center modern-glass-card p-4">
                  <div className="d-flex gap-2">
                    <Button 
                      className="btn-modern-prev-next" 
                      onClick={() => visitQuestion(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      className="btn-modern-prev-next"
                      onClick={() => visitQuestion(Math.min(test.questions.length - 1, currentQuestionIndex + 1))}
                      disabled={currentQuestionIndex === test.questions.length - 1}
                    >
                      Next
                    </Button>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <Button variant="link" className="btn-modern-clear p-0 px-2 text-decoration-none" onClick={() => clearAnswer(currentQuestion.id)}>
                      Clear Answer
                    </Button>
                    <Button className="btn-modern-review" onClick={() => markForReview(currentQuestion.id)}>
                      Mark For Review
                    </Button>
                    <Button className="btn-modern-submit px-4" onClick={() => setShowSubmitModal(true)} disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit Test"}
                    </Button>
                  </div>
               </div>
            </div>
          </div>

          <div className="col-lg-4 col-xl-3">
             <div className="sticky-top" style={{ top: '1.5rem' }}>
                <div className="mb-4 d-none d-lg-block">
                   <Timer formatTime={formatTime} timeLeft={timeLeft} />
                </div>
                
                <QuestionNavigator 
                  questions={test.questions}
                  currentPageIndex={currentQuestionIndex}
                  status={status}
                  onNavigate={visitQuestion}
                />
             </div>
          </div>
        </div>
      </Container>

      <SubmitModal 
        show={showSubmitModal}
        onHide={() => setShowSubmitModal(false)}
        onConfirm={handleFinalSubmit}
        summary={submitSummary}
        submitting={submitting}
      />
    </div>
  );
};

export default MockTestPage;
