import axios from "axios";

export async function getMedia(baseURL, endpoint, params) {
    return await axios.get(`${baseURL}${endpoint}`, { params });
}
