import React from 'react'
import BlogService from '../services/blogs'

const Blog = ({ blog, toggleVisible, increaseLikes }) => {
  const expanded = {display: blog.expanded ? '' : 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const newBlog = Object.assign({}, blog)
    newBlog['likes'] += 1
    newBlog['user'] = newBlog['user']['id']
    delete newBlog['expanded']
    try {
      const response = await BlogService.changeBlog(newBlog)
      increaseLikes(response.id)
    } catch (error) {
      console.log("Lol nope")
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisible(blog.id)}>
        {blog.title} {blog.author}
      </div>
      <div style={expanded}>
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button onClick={() => handleLike()}>like</button><br />
          Added by {blog.user.name}
      </div>
    </div>
  )
}

export default Blog