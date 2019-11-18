import React from 'react'
import BlogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, toggleVisible, increaseLikes, deleteBlog, user }) => {
  const expanded = { display: blog.expanded ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showDeleteButton = { display: blog.user.username === user.username ? '' : 'none' }

  const handleLike = async () => {
    const newBlog = Object.assign({}, blog)
    newBlog['likes'] += 1
    newBlog['user'] = newBlog['user']['id']
    delete newBlog['expanded']
    try {
      const response = await BlogService.changeBlog(newBlog)
      increaseLikes(response.id)
    } catch (error) {
      console.log('Lol nope')
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
      try {
        await BlogService.deleteBlog(blog.id)
        deleteBlog(blog.id)
      } catch (error) {
        console.log('failed')
      }
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
        Added by {blog.user.name}<br />
        <button style={showDeleteButton} onClick={() => handleDelete()}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleVisible: PropTypes.func.isRequired,
  increaseLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog