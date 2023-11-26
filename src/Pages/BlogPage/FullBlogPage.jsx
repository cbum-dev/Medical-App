import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogContainer from './FullBlog';  // Assuming you have a BlogContainer component
import { useParams } from 'react-router-dom';

const FullBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/apis/full/${blogId}/`);
        setBlogs([response.data]);  // Wrap the response data in an array
      } catch (error) {
        console.error('Error fetching Blog Data:', error);
      }
    };

    fetchBlogs();
  }, [blogId]);

  return (
    <div>
      <div className="card-container">
        {blogs.map(blog => (
          <BlogContainer key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default FullBlog;
