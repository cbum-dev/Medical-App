import React from 'react';
import BlogUpdateForm from './BlogUpdateForm';
import { useParams } from 'react-router-dom';

const BlogUpdatePage = () => {
  const blogId = useParams()
  
  return (
    <div>
      <BlogUpdateForm blogId={blogId} />
    </div>
  );
};

export default BlogUpdatePage;
