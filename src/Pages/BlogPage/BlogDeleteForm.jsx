import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const BlogDeleteForm = () => {
  const { blogId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleDeleteBlog = async () => {
      try {
        await axios.delete(
          `https://medi-dep-bykw.vercel.app/apis/blogs/${blogId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        console.log("Blog deleted successfully");
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/blog";
        }, 2000);
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    };

    handleDeleteBlog();
  }, [blogId]);

  return (
    <div>
      <h2>Delete Blog</h2>
      {loading ? (
        <div>
          <p>Deleting the blog...</p>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : null}
    </div>
  );
};

export default BlogDeleteForm;
