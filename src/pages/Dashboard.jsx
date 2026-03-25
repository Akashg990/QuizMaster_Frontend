import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [myResults, setMyResults] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  const handleDelete = async (quizId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");

  if (!confirmDelete) return;

  try {
    await API.delete(`/quiz/${quizId}`);

    // remove from UI instantly
    setQuizzes((prev) => prev.filter((q) => q._id !== quizId));

  } catch (err) {
    console.error(err);
    alert("Failed to delete quiz");
  }
};

  useEffect(() => {
    API.get("/quiz")
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error(err));

    API.get("/result/my-results")
      .then((res) => setMyResults(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-6 py-10">

        {/* Decorative Background Blobs */}
        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-purple-300 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              📚 Available Quizzes
            </h1>

            {role === "admin" && (
              <Link
                to="/create-quiz"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
              >
                + Create Quiz
              </Link>
            )}
          </div>

          {/* Quiz Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => {

              const attempted = myResults.find(
                (result) => result.quiz._id === quiz._id
              );

              return (
                <div
                  key={quiz._id}
                  className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
                >
                  {/* Quiz Title */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {quiz.title}
                  </h3>

                  {/* Completed Badge */}
                  {attempted && (
                    <span className="inline-block mb-4 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      ✔ Completed
                    </span>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-2">

                   {role !== "admin" && (
  <>
    {!attempted ? (
      <Link
        to={`/quiz/${quiz._id}`}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        Start Quiz
      </Link>
    ) : (
      <button
        onClick={() =>
          navigate("/result", {
            state: {
              score: attempted.score,
              totalQuestions: attempted.totalQuestions,
            },
          })
        }
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        View Score
      </button>
    )}
  </>
)}

                    <Link
                      to={`/leaderboard/${quiz._id}`}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
                    >
                      Leaderboard
                    </Link>

                    {role === "admin" && (
                      <Link
                        to={`/add-question/${quiz._id}`}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition"
                      >
                        Add Question
                      </Link>
                    )}
                    {role === "admin" && (
  <button
    onClick={() => handleDelete(quiz._id)}
    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
  >
    Delete
  </button>
)}

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;