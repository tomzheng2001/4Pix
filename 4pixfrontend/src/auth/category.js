import { API } from "../config";

///categories/:userId
export const listCategories = (userId) => {
    return fetch(`${API}/categories/${userId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createCategory = (category, userId, token) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: category,
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
