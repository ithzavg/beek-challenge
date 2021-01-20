import axios from "axios";

export default axios.create({
    baseURL: "https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries",
    headers: {
        "Content-type": "application/json"
    }
});