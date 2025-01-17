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

const request = (endpoint, options) => {
    return fetch(config.baseUrl + endpoint, options).then(checkResponse);
}

export const getInitialCards = () => {
    return request('/cards', {
        headers: config.headers
    })
};

export const getUserInfo = () => {
    return request('/users/me', {
        method: 'GET',
        headers: config.headers,
    })
};

export const addNewCard = ({ name, link }) => {
    return request('/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        }),
    })
};

export const setUserInfo = ({ name, about }) => {
    return request('/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        }),
    })
};

export const removeCard = (cardID) => {
    return request(`/cards/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,
    })
};

export const setUserAvatar = ({ avatar }) => {
    return request('/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar,
        }),
    })
};

export const changeLikeStatus = (cardID, like) => {
    return request(`/cards/likes/${cardID}`, {
        method: like ? 'PUT' : 'DELETE',
        headers: config.headers,
    })
};