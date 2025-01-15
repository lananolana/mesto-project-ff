import { changeLikeStatus } from "./api";

export const handleDeleteCardClick = (cardElement) => {
    cardElement.remove();
}

export const handleLikeIcon = (cardID, likeButton, likesCount) => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    changeLikeStatus(cardID, !isLiked)
        .then((cardData) => {
            likeButton.classList.toggle('card__like-button_is-active');
            likesCount.textContent = cardData.liked.length;
        })
        .catch((err) => {
            console.log(`Ошибка изменения статуса лайка: ${err}`);
        })
}

const getTemplate = () => {
    return document
        .querySelector('#card-template')
        .content.querySelector('.card')
        .cloneNode(true);
};

export const createCardElement = (
    data,
    { onPreviewImage, onLikeIcon, onDelete },
    userId
) => {
    const cardElement = getTemplate();
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likesCount = cardElement.querySelector('.card__like-count');

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardElement.querySelector('.card__title').textContent = data.name;

    const isLiked = data.likes.some((like) => like._id === userId);
    if (isLiked) likeButton.classList.add('card__like-button_is-active');
    likesCount.textContent = data.likes.length;

    if (data.owner._id === userId && onDelete) {
        deleteButton.addEventListener('click', () => {
            onDelete(data._id, cardElement);
        });
    } else {
        deleteButton.remove();
    }

    if (onLikeIcon) {
        likeButton.addEventListener('click', () => {
            onLikeIcon(data._id, likeButton, likesCount);
        });
    }

    if (onPreviewImage) {
        cardImage.addEventListener('click', () => onPreviewImage(data));
    }

    return cardElement;
}
