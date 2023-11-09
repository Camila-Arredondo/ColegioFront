import axios from "axios";


export const HttpUtils = {
    GET: function (url) {
        return axios.get(url,body);
    },
    POST: function (url, body) {
        return axios.post(url, body);
    },
    PATCH: function (url, body) {
        return axios.patch(url, body);
    },
    PUT: function (url, body) {
        return axios.put(url, body);
    },
    DELETE: function (url) {
        return axios.delete(url);
    },
};

