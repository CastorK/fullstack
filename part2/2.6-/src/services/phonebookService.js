import axios from 'axios'
const baseUrl = '/api/persons'

const getAllPersons = () => axios.get(baseUrl).then(response => response.data)
const addPerson = (data) => axios.post(baseUrl, data).then(response => response.data)
const updatePerson = (data) => axios.put(`${baseUrl}/${data.id}`, data).then(response => response.data)
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response)

export default { getAllPersons, addPerson, updatePerson, deletePerson }