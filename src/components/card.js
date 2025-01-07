const handleDeleteCard = (evt) => {
    evt.target.closest('.card').remove();
}

const handleLikeIcon = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}

const getTemplate = () => {
    return document
        .querySelector('#card-template')
        .content.querySelector('.card')
        .cloneNode(true);
};

const createCardElement = (data, { onPreviewImage, onLikeIcon, onDelete }) => {
    const cardElement = getTemplate();
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = data.link;
    cardImage.alt = data.name;

    cardElement.querySelector('.card__title').textContent = data.name;

    if (onDelete) {
        deleteButton.addEventListener('click', onDelete);
    }

    if (onLikeIcon) {
        likeButton.addEventListener('click', onLikeIcon);
    }

    if (onPreviewImage) {
        cardImage.addEventListener('click', () => onPreviewImage(data));
    }

    return cardElement;
}

export {createCardElement, handleDeleteCard, handleLikeIcon};