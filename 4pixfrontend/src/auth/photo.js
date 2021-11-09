import { API } from "../config";

//"/photo/create/:albumId/:userId"

export const createPhoto = (photo, albumId, userId, token) => {
    console.log(albumId, userId, token);
    return fetch(`${API}/photo/create/${albumId}/${userId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: photo,
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

///photos/:albumId"

export const listPhotosByAlbum = (albumId) => {
    return fetch(`${API}/photoslist/${albumId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
