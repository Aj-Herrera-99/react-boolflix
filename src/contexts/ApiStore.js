import axios from "axios";
import {
    api_base_url,
    api_discover_url,
    api_key,
    api_search_url,
    api_trending_url,
} from "../globals/globals";
import { getRndInteger } from "../utils/utils";

const params = {
    api_key: api_key,
    language: "en-US",
};

export const fetchTrendings = async (media) => {
    const res = await axios.get(`${api_trending_url}/${media}/week`, {
        params,
    });
    return res.data.results;
};
export const fetchPopulars = async (media) => {
    const res = await axios.get(`${api_discover_url}/${media}`, {
        params: { ...params, sort_by: "popularity.desc" },
    });
    return res.data.results;
};

export const fetchSearchQuery = async (media, params) => {
    const res = await axios.get(`${api_search_url}/${media}`, {
        params,
    });
    return res.data.results;
};
export const fetchJumboMedia = async (media) => {
    let resList;
    switch (media) {
        case "movie":
            resList = await axios.get(`${api_base_url}/${media}/now_playing`, {
                params,
            });
            break;
        case "tv":
            resList = await axios.get(`${api_base_url}/${media}/on_the_air`, {
                params,
            });
            break;
        default:
            resList = null;
    }
    if (!resList) return null;
    const rndIndex = await getRndInteger(0, resList.data.results.length);
    const jumboId = await resList.data.results[rndIndex].id;
    const resJumbo = await axios.get(`${api_base_url}/${media}/${jumboId}`, {
        params: { ...params, append_to_response: "videos" },
    });
    return resJumbo.data;
};
