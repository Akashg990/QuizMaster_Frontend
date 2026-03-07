
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import QuizAttempt from "./pages/QuizAttempt";
import Result from "./pages/Result";
import Leaderboard from "./pages/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateQuiz from "./pages/CreateQuiz";
import AddQuestion from "./pages/AddQuestion";
import HomePage from "./pages/HomePage";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/dashboard"
          element={<ProtectedRoute><Dashboard/></ProtectedRoute>}
        />

        <Route path="/quiz/:quizId"
          element={<ProtectedRoute><QuizAttempt/></ProtectedRoute>}
        />
        <Route
  path="/create-quiz"
  element={
    <ProtectedRoute>
      <CreateQuiz />
    </ProtectedRoute>
  }
/>
<Route
  path="/add-question/:quizId"
  element={
    <ProtectedRoute>
      <AddQuestion />
    </ProtectedRoute>
  }
/>

        <Route path="/result" element={<ProtectedRoute><Result/></ProtectedRoute>} />
        <Route path="/leaderboard/:quizId" element={<Leaderboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;