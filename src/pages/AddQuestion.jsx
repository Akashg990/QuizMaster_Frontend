import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Layout from "../components/Layout";

function AddQuestion() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/question", {
        quizId,
        questionText,
        options,
        correctAnswer,
      });

      alert("Question Added!");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Add Question</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full mb-4 p-3 border rounded"
            placeholder="Enter Question"
            onChange={(e) => setQuestionText(e.target.value)}
          />

          {options.map((opt, index) => (
            <input
              key={index}
              className="w-full mb-3 p-3 border rounded"
              placeholder={`Option ${index + 1}`}
              onChange={(e) => handleOptionChange(e.target.value, index)}
            />
          ))}

          <input
            className="w-full mb-4 p-3 border rounded"
            placeholder="Correct Answer (must match one option exactly)"
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />

          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
            Add Question
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default AddQuestion;