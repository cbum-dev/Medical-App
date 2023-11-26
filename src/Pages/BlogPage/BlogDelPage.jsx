import React from 'react';
import BlogDeleteForm from './BlogDeleteForm';
import { useParams } from 'react-router-dom';

const BlogDeletePage = () => {
  // Get the blogId from your route or component state
  const blogId = useParams() /* get the blogId */
  
  return (
    <div>
      <BlogDeleteForm blogId={blogId} />
      
    </div>
  );
};

export default BlogDeletePage;
