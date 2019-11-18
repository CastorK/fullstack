import React, {useEffect, useState} from 'react'
import Loginform from './components/Loginform'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'


function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({'msg': '', 'type': ''})

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(data => {
      data.map(x => x['expanded'] = false)
      setBlogs(data)
    })
  }, [])

  const handleLogout = (event) => {
    window.localStorage.clear()
    setUser(null)
  }
  
  const addBlog = (blog) => {
    setBlogs(blogs.concat(blog))
  }

  const increaseLikes = (id) => {
    const newBlogs = blogs.map( blog => {
      if (blog.id === id) blog.likes++
      return blog
    })
    setBlogs(newBlogs)
  }

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(x => x.id !== id))
  }

  const toggleVisible = (id) => {
    const newBlogs = blogs.map( x => {
      if (x.id === id) x.expanded = !x.expanded
      return x
    })
    setBlogs(newBlogs)
  }

  const showNotification = (msg, type) => {
    setNotification({'msg': msg, 'type': type})
    setTimeout(() => {
      setNotification({'msg': '', 'type': ''})
    }, 3000)
  }

  return (
    <div>
      <div>
        <h1>Welcome to Bloggagram</h1>
        <Notification notification={notification} />
      </div>
      {
        user === null
        ? <Loginform setUser={setUser} showNotification={showNotification}/> 
        : <div>
            <h3>Logged in as { user.username }<button onClick={handleLogout}>Logout</button></h3>
            <Toggleable buttonLabel="New note">
              <CreateBlog addBlog={ addBlog } showNotification={showNotification}/>
            </Toggleable>
            <h3>List of blogs</h3>
            {blogs
              .sort( (x,y) => y.likes-x.likes )
              .map( b => <Blog key={b.id} blog={b} toggleVisible={toggleVisible} increaseLikes={increaseLikes} deleteBlog user={user}/> )}
          </div>
      }
    </div>
  );
}

export default App;
