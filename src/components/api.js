const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: '1945e5a3-b0fe-453e-a642-aa277741f9f6',
        'Content-Type': 'application/json'
    }
};

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(checkResponse);
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    }).then(checkResponse);
};

export const addNewCard = ({ name, link }) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        }),
    }).then(checkResponse);
};

export const setUserInfo = ({ name, about }) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        }),
    }).then(checkResponse);
};

export const removeCard = (cardID) => {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(checkResponse);
};

export const setUserAvatar = ({ avatar }) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar,
        }),
    }).then(checkResponse);
};

export const changeLikeStatus = (cardID, like) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: like ? 'PUT' : 'DELETE',
        headers: config.headers,
    }).then(checkResponse);
};