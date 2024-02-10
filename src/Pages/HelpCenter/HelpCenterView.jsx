import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [newProblem, setNewProblem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProblems = async () => {
    try {
      const response = await axios.get(
        "https://medi-dep-bykw.vercel.app/apis/help-center/"
      );
      setProblems(response.data);
      setFilteredProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  const handleAddProblem = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      await axios.post(
        "https://medi-dep-bykw.vercel.app/apis/help-center/create/",
        { problem: newProblem },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewProblem("");
      fetchProblems();
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = problems.filter((problem) =>
      problem.problem.toLowerCase().includes(searchTermLower)
    );
    setFilteredProblems(filtered);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <h4 className="text-white display-6 my-3 text-center">Search Problems</h4>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by problem..."
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {localStorage.getItem("access_token") && (
        <div className="mb-4">
          <h3 className="text-white ">Add Your Problem</h3>
          <div className="input-group">
            <textarea
              className="form-control"
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
              placeholder="Type your problem here..."
              rows="3"
            />
            <button className="btn btn-primary ms-2" onClick={handleAddProblem}>
              Add Problem
            </button>
          </div>
        </div>
      )}

      <h3 className="text-white">Problems</h3>
      {filteredProblems.map((problem) => (
        <div key={problem.prob_id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{problem.problem}</p>
            <small className="text-muted">
              Posted by {problem.user.username} on{" "}
              {new Date(problem.date).toLocaleDateString()}
            </small>
            <Link
              to={`/comment/${problem.prob_id}`}
              className="btn btn-outline-secondary float-end"
            >
              Comments
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
