import axios from "axios";

const API = axios.create({
  baseURL: "https://phonebook-api-u7q6.onrender.com"
});

export default API;
