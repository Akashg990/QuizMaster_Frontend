import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch {
      user = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-600";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 tracking-wide"
        >
          QuizMaster
        </Link>

        <div className="flex items-center gap-6">

          {/* Home always visible */}
          <Link
            to="/"
            className={`${isActive("/")} hover:text-indigo-600 transition`}
          >
            Home
          </Link>

          {/* Logged-in links */}
          {user && (
            <>
              <Link
                to="/dashboard"
                className={`${isActive("/dashboard")} hover:text-indigo-600 transition`}
              >
                Dashboard
              </Link>

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                👋 {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* Logged-out links */}
          {!user && (
            <>
              <Link
                to="/login"
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;