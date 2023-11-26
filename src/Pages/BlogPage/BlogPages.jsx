// Your main component (e.g., BlogPage.js)
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
        // Make a POST request to your API endpoint
        await axios.post("http://localhost:8000/apis/blogs/create/", blogData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        // Optionally, you can redirect or perform other actions after successful creation
        alert("Blog created successfully");
        window.location.href = "/blog"

      } catch (error) {
        console.error("Error creating blog:", error);
      }
    }
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <BlogForm onSubmit={handleCreateBlog} />
    </div>
  );
};

export default BlogPage;
