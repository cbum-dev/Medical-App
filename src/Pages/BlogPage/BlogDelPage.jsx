import React from "react";
import BlogDeleteForm from "./BlogDeleteForm";
import { useParams } from "react-router-dom";

const BlogDeletePage = () => {
  const blogId = useParams();

  return (
    <div>
      <BlogDeleteForm blogId={blogId} />
    </div>
  );
};

export default BlogDeletePage;
