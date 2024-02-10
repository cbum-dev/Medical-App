<div className="blog-container">
  <div className="header">
    <div className="profile-pic">
      <img
        className="image"
        src="https://images.unsplash.com/photo-1699920238877-35a0b75ae673?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Mnx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>
    <div className="Author">
      <span id="name">{blog.author.username}</span>
      <br />
      <span id="date">{blog.author.email}</span>
    </div>
  </div>
  <div className="title">{blog.title}</div>
  <div className="content">{blog.content}...Read More!!</div>
  <div className="footer">
    <div className="view-full">
      <Link to={`/blog/${blog.id}`} className="bttn">
        Read Full Blog
      </Link>
    </div>
    <div className="likes-view">
      <button className="likes">
        <HeartFill color="crimson" /> : {blog.likes_count}
      </button>
    </div>
  </div>
</div>;
