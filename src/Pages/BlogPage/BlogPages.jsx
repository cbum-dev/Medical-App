import React from "react";
import axios from "axios";
import BlogForm from "./BlogForm";

const BlogPage = () => {
  const handleCreateBlog = async (blogData) => {
    if (localStorage.getItem("access_token") === null) {
      alert("Login First To Write Your Own Blogs !");
      window.location.href = "/login";
    } else {
      try {
        await axios.post(
          "https://medi-dep-bykw.vercel.app/apis/blogs/create/",
          blogData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        alert("Blog created successfully");
        window.location.href = "/blog";
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    }
  };

  return (
    <div className="text-white px-2 d-flex flex-column align-items-center vh-100">
      <h2 className="mx-2 mb-3 mt-3 display-6 text-white">Create a New Blog</h2>
      <BlogForm onSubmit={handleCreateBlog} />
    </div>
  );
};

export default BlogPage;
