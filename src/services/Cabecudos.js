import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL === "prod" ? "https://cabecudos-back.herokuapp.com" : "http://localhost:4000";

function createConfig(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return config;
}

function sendUserData(body) {
    return axios.post(BASE_URL+"/sign-up", body);
}

function getUserData(body) {
    return axios.post(BASE_URL+"/sign-in", body);
}

function closeSession(token) {
    return axios.delete(`${BASE_URL}/sign-out`, createConfig(token));
}

function getProducts () {
    return axios.get(`${BASE_URL}/products`);
}

function getProductById (id) {
    return axios.get(`${BASE_URL}/products/${id}`)
}

export {
    getUserData,
    sendUserData,
    closeSession,
    getProducts,
    getProductById,
}