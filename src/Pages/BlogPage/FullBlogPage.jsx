import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogContainer from "./FullBlog";
import { useParams } from "react-router-dom";

const FullBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://medi-dep-bykw.vercel.app/apis/full/${blogId}/`
        );
        setBlogs([response.data]);
      } catch (error) {
        console.error("Error fetching Blog Data:", error);
      }
    };

    fetchBlogs();
  }, [blogId]);

  return (
    <div className="px-2 d-flex flex-column align-items-center">
      <div className="card-container">
        {blogs.map((blog) => (
          <BlogContainer key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default FullBlog;
