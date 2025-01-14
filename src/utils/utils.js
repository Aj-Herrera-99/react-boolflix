import axios from "axios";

export function getMedia(baseURL, endpoint, params, cb) {
    axios
        .get(`${baseURL}${endpoint}`, { params })
        .then((res) => {
            const filteredMedia = res.data.results;
            console.log(filteredMedia);
            cb(filteredMedia);
        })
        .catch((err) => console.error(err));
}
