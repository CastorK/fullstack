import React, {useEffect, useState} from 'react'
import Loginform from './components/Loginform'
import blogService from './services/blogs'


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
      {user === null ? <Loginform setUser={setUser}/> : <div>{ user.name }</div>}
      {blogs.map( x => <div key={x.id}>{x.title}</div>)}
    </div>
  );
}

export default App;
