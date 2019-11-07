import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line
let token = null
const setToken = (newToken) => { token = `bearer ${newToken}` }
const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log("GET BLOGS:")
  console.log(response.data)
  return response.data
}

export default { getAll, setToken }