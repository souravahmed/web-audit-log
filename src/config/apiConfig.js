import Axios from "axios";

export const api = Axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});
