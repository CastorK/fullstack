import React, {useEffect, useState} from 'react'
import Loginform from './components/Loginform'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'


function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(data => setBlogs(data))
  }, [])

  const handleLogout = (event) => {
    window.localStorage.clear()
    setUser(null)
  }
  
  const addBlog = (blog) => {
    setBlogs(blogs.concat(blog))
  }

  return (
    <div>
      <div>
        <h1>Welcome to Bloggagram</h1>
      </div>
      {
        user === null
        ? <Loginform setUser={setUser}/> 
        : <div>
            <h3>Logged in as { user.username }<button onClick={handleLogout}>Logout</button></h3>
            <CreateBlog addBlog={ addBlog }/>
            <h3>List of blogs</h3>
            {blogs.map( b => <Blog key={b.id} blog={b} /> )}
          </div>
      }
    </div>
  );
}

export default App;
