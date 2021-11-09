import axios from "axios";

const BASE_URL = process.env.API_URL === "prod" ? "https://cabecudos-back.herokuapp.com" : "http://localhost:4000";

function getProducts () {
    return axios.get(`${BASE_URL}/products`)
}

export {
    getProducts,
}