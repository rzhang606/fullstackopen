import axios from 'axios';
const baseURL = '/api/persons'; //proxy redirects (from package.json)

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    console.log('Getting all from server ... ');
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseURL, newObject, config);
    return response.data;
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data);
}

export default {getAll, create, remove, update, setToken}