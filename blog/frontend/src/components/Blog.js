import React from 'react'
const Blog = ({ blog, toggleVisible }) => {
  const expanded = {display: blog.expanded ? '' : 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisible(blog.id)}>
        {blog.title} {blog.author}
      </div>
      <div style={expanded}>
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button>like</button><br />
          Added by {blog.user.name}
      </div>
    </div>
  )
}

export default Blog