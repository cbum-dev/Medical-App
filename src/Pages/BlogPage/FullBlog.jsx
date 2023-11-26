import React from 'react';
import {HeartFill } from 'react-bootstrap-icons';

const BlogContainer = ({blog}) => {
  const author = blog.author.username[0].toUpperCase()+blog.author.username.substring(1);
  const title = blog.title[0].toUpperCase()+blog.title.substring(1);
  return (
    <div className="card text mb-3" style={{ width: '100%', height: '80vh' ,display:'flex',justifyContent:'center',textAlign:'center'}}>
      <div className="card-header "style={{fontSize:'2rem'}}>Blog By : {author}</div>
      <div className="card-body ">
        <h5 className="card-title mb-3"style={{fontSize:'2.5rem'}}>{title}</h5>
        <p className="card-text bg-success"style={{fontSize:'1.3rem'}}>
          {blog.content}
        
        </p>
      </div>
    </div>
  );
};

export default BlogContainer;
