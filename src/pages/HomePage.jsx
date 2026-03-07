import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
     const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Only redirect if user came from login page
    if (token && document.referrer.includes("/login")) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">

        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
          
          <div className="flex-1">
            <h1 className="text-5xl font-bold leading-tight text-gray-800">
              Test Your Knowledge with
              <span className="text-indigo-600"> QuizMaster</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Create quizzes, challenge yourself, and climb the leaderboard.
              A modern platform to practice, learn, and compete.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Illustration Side */}
          <div className="flex-1 text-center">
            <div className="bg-indigo-100 p-10 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-indigo-700">
                🧠 Learn. Compete. Improve.
              </h2>
            </div>
          </div>

        </section>

        {/* FEATURES SECTION */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-3xl font-bold text-center mb-14">
              Platform Features
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-3">
                  📝 Interactive Quizzes
                </h3>
                <p className="text-gray-600">
                  Attempt quizzes with multiple choice questions and track
                  your progress easily.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-3">
                  🏆 Leaderboard
                </h3>
                <p className="text-gray-600">
                  Compete with other users and climb the leaderboard with
                  your best scores.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-3">
                  ⏱ Timed Challenges
                </h3>
                <p className="text-gray-600">
                  Every quiz has a timer to simulate real exam environments
                  and test your speed.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-indigo-600 py-20 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Quiz Journey?
          </h2>

          <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Join Now
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-400 text-center py-6">
          <p>
            © {new Date().getFullYear()} QuizMaster. Built with MERN Stack.
          </p>
        </footer>

      </div>
    </>
  );
}

export default HomePage;