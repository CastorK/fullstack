import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line
let token = null
const setToken = (newToken) => { token = `bearer ${newToken}` }

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blogdata) => {
  const config = { 'headers': {'Authorization': token}}
  const response = await axios.post(baseUrl, blogdata, config)
  return response.data
}

const changeBlog = async (blogdata) => {
  const config = { 'headers': {'Authorization': token}}
  const response = await axios.put(`${baseUrl}/${blogdata.id}`, blogdata, config)
  return response.data
}
export default { getAll, setToken, createBlog, changeBlog }