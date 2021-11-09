import { API } from "../config";

// /albums/create/:categoryId/:userId

export const createAlbum = (album, categoryId, userId, token) => {
    return fetch(`${API}/albums/create/${categoryId}/${userId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: album,
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

///albums/list/:categoryId

export const listAlbums = (categoryId) => {
    return fetch(`${API}/albums/list/`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const listAllAlbums = (userId) => {
    return fetch(`${API}/albums/listAll/${userId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
