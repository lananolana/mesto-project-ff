const config = {
    baseUrl: 'https://nomoreparties.co/v1/',
    headers: {
        authorization: '',
        'Content-Type': 'application/json'
    }
};

const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(getResponseData);
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    }).then(getResponseData);
};

export const addNewCard = ({ name, link }) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        }),
    }).then(getResponseData);
};

export const setUserInfo = ({ name, about }) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        }),
    }).then(getResponseData);
};

export const removeCard = (cardID) => {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(getResponseData);
};

export const setUserAvatar = ({ avatar }) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar,
        }),
    }).then(getResponseData);
};

export const changeLikeStatus = (cardID, like) => {
    return fetch(`${config.baseUrl}/cards/like/${cardID}`, {
        method: like ? 'PUT' : 'DELETE',
        headers: config.headers,
    }).then(getResponseData);
};