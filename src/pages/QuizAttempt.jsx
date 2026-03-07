import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Layout from "../components/Layout";

function QuizAttempt() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // 🔹 Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/question/${quizId}`);
        setQuestions(res.data);
      } catch (err) {
        setErrorMessage("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  // 🔹 Timer Logic
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // 🔹 Select Answer
  const handleSelect = (questionId, option) => {
    setAnswers((prev) => {
      const filtered = prev.filter(
        (item) => item.questionId !== questionId
      );
      return [...filtered, { questionId, selectedOption: option }];
    });
  };

  // 🔹 Submit Quiz
  const handleSubmit = async () => {
    if (submitted) return;

    try {
      setSubmitted(true);

      const res = await API.post("/result/submit", {
        quizId,
        answers,
      });

      navigate("/result", { state: res.data });

    } catch (err) {
      if (err.response && err.response.status === 400) {
        // Already attempted
        setErrorMessage(
          "You have already attempted this quiz. Redirecting to dashboard..."
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);

      } else {
        setErrorMessage("Something went wrong. Please try again.");
        setSubmitted(false);
      }
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">

        {/* Timer */}
        <div className="text-right mb-6">
          <span className="text-lg font-semibold text-red-600">
            Time Left: {minutes}:{seconds}
          </span>
        </div>

        {/* Error Card */}
        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md">
            <p className="font-medium">
              ⚠ {errorMessage}
            </p>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6">Quiz</h2>

        {loading ? (
          <p className="text-center text-gray-500">
            Loading questions...
          </p>
        ) : (
          <>
            {questions.map((q, index) => (
              <div
                key={q._id}
                className="bg-white p-6 rounded-xl shadow mb-6"
              >
                <p className="font-semibold mb-4">
                  {index + 1}. {q.questionText}
                </p>

                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className="block mb-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={q._id}
                      value={opt}
                      onChange={() => handleSelect(q._id, opt)}
                      className="mr-2"
                      disabled={submitted}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))}

            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={submitted}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                Submit Quiz
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default QuizAttempt;