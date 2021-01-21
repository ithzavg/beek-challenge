import axios from "axios";

const token = "CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc"
export default axios.create({
    baseURL: "https://api.contentful.com",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});