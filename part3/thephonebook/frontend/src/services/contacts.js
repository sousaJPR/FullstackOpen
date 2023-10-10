import axios from 'axios'

const baseUrl = '/api/persons'

const getAllContacts = () => {
    return axios.get(baseUrl)
}

const createContact = (newObj) => {
    return axios.post(baseUrl, newObj)
}

const updateContact = (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj)
}

const deleteContact = (id) => {
        return axios.delete(`${baseUrl}/${id}`)
    
}
export default { getAllContacts, createContact, updateContact, deleteContact }