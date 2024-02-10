import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const Blog = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://medi-dep-bykw.vercel.app/apis/blogs/"
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching healthcare providers:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="px-2 d-flex flex-column align-items-center">
      <h1 className=" mx-2 display-6 my-3 text-white">All Blogs</h1>
      <button className="btn w-25 btn-success border-2 border-tertiary mb-2 mx-2">
        {" "}
        {isAuth ? (
          <Link className="Add  text-white" to="/createblog">
            Your Blogs
          </Link>
        ) : (
          <Link className="login" to="/login">Login To See Your Blog</Link>
        )}
      </button>

      <div className="card-container">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <div className="">
        <button className="btn btn-success text-white mx-2 my-2">
          {" "}
          {isAuth ? (
            <Link className="Add text-white" to="/createblog">
              Add your blogs here
            </Link>
          ) : (
            <Link className="login text-white" to="/login">
              Login To Create Blog
            </Link>
          )}
        </button>
      </div>
    </div>
  );
};
export default Blog;
