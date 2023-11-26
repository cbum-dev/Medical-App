import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';  // Assuming you have a BlogForm component
import { useParams } from 'react-router-dom';

const BlogUpdateForm = () => {
  const { blogId } = useParams();

  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/apis/blogs/${blogId}/`);
        setBlogData(response.data);
      } catch (error) {
        console.error('Error fetching Blog Data:', error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleUpdateBlog = async (updatedData) => {
    try {
      await axios.patch(`http://localhost:8000/apis/blogs/${blogId}/`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log('Blog updated successfully');
      // Optionally, you can redirect or perform other actions after successful update
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (!blogData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Update Blog</h2>
      <BlogForm initialData={blogData} onSubmit={handleUpdateBlog} />
    </div>
  );
};

export default BlogUpdateForm;
