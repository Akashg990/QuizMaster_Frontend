import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Layout from "../components/Layout";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/quiz", {
        title,
        category,
        description,
      });

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Create Quiz</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-4 p-3 border rounded"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full mb-4 p-3 border rounded"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
          />

          <textarea
            className="w-full mb-4 p-3 border rounded"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="bg-indigo-600 text-white px-6 py-2 rounded">
            Create
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateQuiz;