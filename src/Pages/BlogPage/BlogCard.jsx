import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeartFill } from "react-bootstrap-icons";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";

const BlogCard = ({ blog }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes_count);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(delay);
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

  if (loading) {
    return (
      <Card className="mb-3 mx-2 my-2 border-gradient-secondary border-2">
        <Card.Body>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span className="ms-2">Loading Blog...</span>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-3 mx-2 my-2 border-gradient-secondary border-2">
      <Card.Header className="bg-light text-dark">
        <div className="d-flex align-items-center">
          <div className="Author">
            <span className="fw-bold">{blog.author.username}</span>
            <br />
            <span>{blog.author.email}</span>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.content} ...Read More!!</p>
      </Card.Body>
      <Card.Footer className="bg-light d-flex justify-content-end">
        <Link to={`/blog/${blog.id}`} className="btn py-2 btn-primary px-2 py-0">
          Read Full Blog
        </Link>
        <button
          className="btn btn-outline-danger ms-2 px-2 py-0"
          onClick={handleLike}
          disabled={isLiked}
        >
          <HeartFill color={isLiked ? "crimson" : "black"} size={20} />
          <span className="ms-1">{likesCount}</span>
        </button>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
