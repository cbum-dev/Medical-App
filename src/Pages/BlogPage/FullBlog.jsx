import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const BlogContainer = ({ blog }) => {
  const author =
    blog.author.username[0].toUpperCase() + blog.author.username.substring(1);
  const title = blog.title[0].toUpperCase() + blog.title.substring(1);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes_count);
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

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("Access token not found.");
        return;
      }

      await axios.post(
        `https://medi-dep-bykw.vercel.app/apis/like/${blog.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLiked(true);
      setLikesCount(likesCount + 1);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  return (
    <div
      className="card text mb-3 mt-3n"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        border: "2px solid #ced4da",
        borderRadius: "10px",
      }}
    >
      <div
        className="card-header bg-secondary text-light"
        style={{ fontSize: "1.5rem", borderBottom: "2px solid #ced4da" }}
      >
        Blog By: {author}
      </div>
      <div className="card-body">
        <h5
          className="card-title mb-3"
          style={{ fontSize: "2.5rem", color: "#212529" }}
        >
          {title}
        </h5>
        <p
          className="card-text bg-light p-3"
          style={{
            fontSize: "1.3rem",
            color: "#495057",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {blog.content}
        </p>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between align-items-center">
          <button
            className={`btn btn-outline-danger ${isLiked ? "disabled" : ""}`}
            onClick={handleLike}
            style={{ flex: "1" }}
          >
            <HeartFill size={20} />
            <span className="ml-2">{likesCount} Likes</span>
          </button>
          {currentUser && currentUser.user_id === blog.author.id && (
            <div className="mt-2">
              <button className="btn mx-1">
                <Link
                  to={`/blog/update/${blog.id}`}
                  className="btn btn-primary"
                >
                  Update
                </Link>
              </button>
              <button className="btn mx-1">
                <Link to={`/blog/del/${blog.id}`} className="btn btn-primary">
                  Delete
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogContainer;
