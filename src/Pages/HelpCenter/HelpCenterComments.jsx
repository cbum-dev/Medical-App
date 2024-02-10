import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const HelpCenterComment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { helpCenterId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (token) {
          const response = await axios.get(
            "https://medi-dep-bykw.vercel.app/current-user/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://medi-dep-bykw.vercel.app/apis/help-center/${helpCenterId}/comments/`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      await axios.post(
        `https://medi-dep-bykw.vercel.app/apis/help-center/${helpCenterId}/comments/`,
        { comment: newComment, problem: helpCenterId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleUpdateComment = (commentId) => {
    console.log(`Update comment with ID ${commentId}`);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log(token);
      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      await axios.delete(
        `https://medi-dep-bykw.vercel.app/apis/help-center/comments/${commentId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [helpCenterId]);

  return (
    <div className="container mt-4">
      <h1 className="text-white text-center my-3 display-6">Comments</h1>
      {localStorage.getItem("access_token") && (
        <div className="mb-4">
          <h3 className="text-white">Add Your Comment</h3>
          <div className="input-group">
            <textarea
              className="form-control"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type your comment here..."
              rows="3"
            />
            <button className="btn btn-primary ms-2" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      )}

      <h3 className="text-white">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{comment.comment}</p>
            <small className="text-muted">
              Posted by {comment.user} on{" "}
              {new Date(comment.date).toLocaleDateString()}
            </small>
            {currentUser && currentUser.user_id === comment.user && (
              <div className="mt-2">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => handleUpdateComment(comment.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpCenterComment;
