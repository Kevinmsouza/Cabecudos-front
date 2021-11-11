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

function closeSession(token) {
    return axios.delete(`${BASE_URL}/sign-out`, createConfig(token));
}

function getProducts () {
    return axios.get(`${BASE_URL}/products`);
}

function getAddresses(token) {
    return axios.get(`${BASE_URL}/addresses`, createConfig(token));
}

function postAddress(token, body) {
    return axios.post(`${BASE_URL}/addresses`, body, createConfig(token));
}

function deleteAddress(token, id) {
    return axios.delete(`${BASE_URL}/addresses/${id}`, createConfig(token));
}

export {
    sendUserData,
    closeSession,
    getProducts,
    getAddresses,
    postAddress,
    deleteAddress,
}