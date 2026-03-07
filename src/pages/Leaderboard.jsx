import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Layout from "../components/Layout";

function Leaderboard() {
  const { quizId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get(`/result/leaderboard/${quizId}`);
        setLeaderboard(res.data.leaderboard);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [quizId]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          🏆 Leaderboard
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : leaderboard.length === 0 ? (
          <p className="text-center text-gray-500">
            No attempts yet.
          </p>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-4">Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Percentage</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((entry, index) => {
                  const percentage = (
                    (entry.score / entry.totalQuestions) *
                    100
                  ).toFixed(1);

                  let rankStyle = "";
                  let medal = "";

                  if (index === 0) {
                    rankStyle = "bg-yellow-100 font-bold";
                    medal = "🥇";
                  } else if (index === 1) {
                    rankStyle = "bg-gray-100 font-semibold";
                    medal = "🥈";
                  } else if (index === 2) {
                    rankStyle = "bg-orange-100 font-semibold";
                    medal = "🥉";
                  }

                  return (
                    <tr
                      key={entry._id}
                      className={`border-b hover:bg-gray-50 transition ${rankStyle}`}
                    >
                      <td className="p-4">
                        {medal} {index + 1}
                      </td>
                      <td>{entry.user.name}</td>
                      <td>{entry.score} / {entry.totalQuestions}</td>
                      <td className="font-medium text-indigo-600">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Leaderboard;