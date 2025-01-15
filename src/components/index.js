import '../pages/index.css';

import { createCardElement, handleDeleteCardClick, handleLikeIcon } from './card.js';
import { openModal, closeModal, setCloseModalEventListeners } from './modal.js'
import {
    getInitialCards,
    getUserInfo,
    addNewCard,
    setUserInfo,
    removeCard,
    setUserAvatar,
} from "./api";
import { enableValidation, clearValidation } from "./validation.js";
const formValidationConfig = {
    formSelector: '.popup__form',
    fieldsetSelector: '.popup__set',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-type-error',
    errorClass: 'popup__input-error_visible'
}

let userId = null;
let submitFormConfirm = () => {};

const placesWrap = document.querySelector('.places__list');

// POPUP: add new card
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardForm = newCardModal.querySelector('.popup__form');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardForm.querySelector('.popup__input_type_url');
const newCardSubmitButton = newCardForm.querySelector("[type='submit']");

// POPUP: delete card
const cardDeleteModal = document.querySelector('.popup_type_remove-card');
const cardDeleteSubmitButton = cardDeleteModal.querySelector("[type='submit']");

// POPUP: edit profile info
const profileModal = document.querySelector('.popup_type_edit');
const profileForm = profileModal.querySelector('.popup__form');
const profileTitleInput = profileForm.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileForm.querySelector('.popup__input_type_description');
const profileSubmitButton = profileForm.querySelector("[type='submit']");

// POPUP: edit avatar
const avatarModal = document.querySelector('.popup_type_edit-avatar');
const avatarForm = avatarModal.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input');
const avatarSubmitButton = avatarForm.querySelector("[type='submit']");

// POPUP: image fullscreen
const imageModal = document.querySelector('.popup_type_image');
const imageElement = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

// BUTTONS: add new card & edit profile info
const addNewCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

// Profile info
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');


const handlePreviewImage = ({ name, link }) => {
    imageElement.src = link;
    imageElement.alt = `Изображение ${name}`;
    imageCaption.textContent = name;
    openModal(imageModal);
};

const handleDeleteCard = (cardId, cardElement) => {
    submitFormConfirm = () => {
        cardDeleteSubmitButton.textContent = 'Удаление…';
        removeCard(cardId)
            .then(() => {
                handleDeleteCardClick(cardElement);
                closeModal(cardDeleteModal);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                cardDeleteSubmitButton.textContent = 'Да';
            });
    };
    openModal(cardDeleteModal);
}

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileSubmitButton.textContent = 'Сохранение…';
    setUserInfo({
        name: profileTitleInput.value,
        about: profileDescriptionInput.value,
    })
        .then((userData) => {
            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closeModal(profileModal);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            profileSubmitButton.textContent = 'Сохранить';
        });
};

const handleNewCardFormSubmit = (evt) => {
    evt.preventDefault();
    newCardSubmitButton.textContent = 'Создание…';
    addNewCard({
        name: newCardNameInput.value,
        link: newCardLinkInput.value,
    })
        .then((newCardData) => {
            const cardElement = createCardElement(
                newCardData,
                {
                    onPreviewImage: handlePreviewImage,
                    onLikeIcon: handleLikeIcon,
                    onDelete: handleDeleteCard,
                },
                userId
            );
            placesWrap.prepend(cardElement);
            closeModal(newCardModal);
            newCardForm.reset();
            clearValidation(newCardForm, formValidationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            newCardSubmitButton.textContent = "Создать";
        });
};

const handleAvatarFormSubmit = (evt) => {
    evt.preventDefault();
    avatarSubmitButton.textContent = 'Сохранение…';
    setUserAvatar({
        avatar: avatarInput.value,
    })
        .then((userData) => {
            profileAvatar.style.background = `url(${userData.avatar})`;
            closeModal(avatarModal);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarSubmitButton.textContent = 'Сохранить';
        })
}

profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
cardDeleteModal.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitFormConfirm();
});

addNewCardButton.addEventListener('click', () => {
    clearValidation(newCardForm, formValidationConfig);
    newCardForm.reset();
    openModal(newCardModal)
});
editProfileButton.addEventListener('click', () => {
    clearValidation(profileForm, formValidationConfig);
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileModal);
});
profileAvatar.addEventListener('click', () => {
    clearValidation(avatarForm, formValidationConfig);
    avatarForm.reset();
    openModal(avatarModal);
});

setCloseModalEventListeners(newCardModal);
setCloseModalEventListeners(profileModal);
setCloseModalEventListeners(imageModal);
setCloseModalEventListeners(avatarModal);
setCloseModalEventListeners(cardDeleteModal);

enableValidation(formValidationConfig);

Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userData]) => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

        cards.forEach((data) => {
            const cardElement = createCardElement(
                data,
                {
                    onPreviewImage: handlePreviewImage,
                    onLikeIcon: handleLikeIcon,
                    onDelete: handleDeleteCard,
                },
                userId
            );
            placesWrap.prepend(cardElement);
            console.log(cardElement);
        });
    })
    .catch((err) => {
        console.log(err);
    });
