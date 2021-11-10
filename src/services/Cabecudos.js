import axios from "axios";

const BASE_URL = process.env.API_URL === "prod" ? "https://cabecudos-back.herokuapp.com" : "http://localhost:4000";

function sendUserData(body) {
    return axios.post(BASE_URL+"/sign-up", body);
}

export { sendUserData };