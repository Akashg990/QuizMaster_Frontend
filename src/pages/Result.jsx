import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, totalQuestions } = location.state || {};

  if (!score && score !== 0) {
    return (
      <Layout>
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold">
            No Result Data Available
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"
          >
            Go to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  const percentage = ((score / totalQuestions) * 100).toFixed(1);

  let performanceText = "";
  let performanceColor = "";

  if (percentage >= 80) {
    performanceText = "Excellent Performance 🎉";
    performanceColor = "text-green-600";
  } else if (percentage >= 50) {
    performanceText = "Good Job 👍";
    performanceColor = "text-yellow-600";
  } else {
    performanceText = "Needs Improvement 📚";
    performanceColor = "text-red-600";
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg text-center">

          <h2 className="text-3xl font-bold mb-8">
            🎯 Quiz Result
          </h2>

          {/* Score Section */}
          <div className="mb-6">
            <div className="text-5xl font-extrabold text-indigo-600">
              {score} / {totalQuestions}
            </div>
            <p className="text-gray-500 mt-2">
              Your Final Score
            </p>
          </div>

          {/* Percentage */}
          <div className="mb-6">
            <div className="text-4xl font-bold">
              {percentage}%
            </div>
          </div>

          {/* Performance Message */}
          <div className={`text-lg font-semibold mb-8 ${performanceColor}`}>
            {performanceText}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Back to Dashboard
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Review Quiz
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Result;