import React, {useEffect, useState} from 'react'
import Loginform from './components/Loginform'
import blogService from './services/blogs'
import Blog from './components/Blog'


function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      console.log(loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(data => setBlogs(data))
  }, [])

  return (
    <div>
      <div>
        <h1>Welcome to Bloggagram</h1>
      </div>
      {
        user === null
        ? <Loginform setUser={setUser}/> 
        : <div>
            <h3>Logged in as { user.username }</h3>
            {blogs.map( b => <Blog key={b.id} blog={b} /> )}
          </div>
      }
    </div>
  );
}

export default App;
