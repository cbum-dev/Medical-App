// src/components/HealthcareProviders.js
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import './style.css'

const Blog = () => {
  const [isAuth, setIsAuth] = useState(false);   
  useEffect(() => {     
    if (localStorage.getItem('access_token') !== null) {        
        setIsAuth(true); 
  }
}, [isAuth]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/apis/blogs/');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching healthcare providers:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h2 className='All'>All Blogs</h2>
      {isAuth ? <Link className = 'Add'to="/createblog">Your Blogs</Link> :
                <Link className='login'to="/login"></Link>
                      }
      <div className="card-container">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <div >
        {isAuth ? <Link className = 'Add'to="/createblog">Add your blogs here</Link> :
                  <Link className='login'to="/login">Login To Create Blog</Link>
        }

      </div>
    </div>
  );
};
export default Blog;

