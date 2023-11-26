import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HeartFill } from "react-bootstrap-icons";
import axios from "axios";

const BlogCard = ({ blog }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes_count);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("Access token not found.");
        return;
      }

      await axios.post(
        `http://localhost:8000/apis/like/${blog.id}/`,
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
    <div className="card mb-3 ">
      <div className="card-header">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle me-2"
            src="https://images.unsplash.com/photo-1699920238877-35a0b75ae673?w=50&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Mnx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="Author">
            <span className="fw-bold">{blog.author.username}</span>
            <br />
            <span>{blog.author.email}</span>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.content}...Read More!!</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <div className="d-flex">
          <Link to={`/blog/del/${blog.id}`} className="btn btn-danger me-2">
            Delete
          </Link>
          <Link to={`/blog/update/${blog.id}`} className="btn btn-warning">
            Update
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <Link to={`/blog/${blog.id}`} className="btn btn-primary me-2">
            Read Full Blog
          </Link>
          <button className="btn btn-outline-danger" onClick={handleLike} disabled={isLiked}>
            <HeartFill color={isLiked ? "crimson" : "black"} />
            <span className="ms-1">{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
