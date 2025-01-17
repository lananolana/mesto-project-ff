import '../pages/index.css';

import * as constants from './utils/constants.js';
import { handleSubmit } from "./utils/utils.js";
import { handleDeleteCardClick, handleLikeIcon, renderCard } from './card.js';
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
import {popups} from "./utils/constants.js";

let userId = null;
let submitFormConfirm = () => {};

const handlePreviewImage = ({ name, link }) => {
    constants.imageElement.src = link;
    constants.imageElement.alt = `Изображение ${name}`;
    constants.imageCaption.textContent = name;
    openModal(constants.imageModal);
};

const handleDeleteCard = (cardId, cardElement) => {
    submitFormConfirm = (evt) => {
        function makeRequest() {
            return removeCard(cardId)
                .then(() => {
                    handleDeleteCardClick(cardElement);
                    closeModal(constants.cardDeleteModal);
                })
        }
        handleSubmit(makeRequest, evt, 'Удаление…')
    };
    openModal(constants.cardDeleteModal);
}

const handleProfileFormSubmit = (evt) => {
    function makeRequest() {
        return setUserInfo({
            name: constants.profileTitleInput.value,
            about: constants.profileDescriptionInput.value,
        })
            .then((userInfo) => {
                constants.profileTitle.textContent = userInfo.name;
                constants.profileDescription.textContent = userInfo.about;
                closeModal(constants.profileModal);
            });
    }
    handleSubmit(makeRequest, evt);
}

const handleNewCardFormSubmit = (evt) => {
    const makeRequest = () => {
        return addNewCard({
            name: constants.newCardNameInput.value,
            link: constants.newCardLinkInput.value,
        })
            .then((newCardData) => {
                renderCard(newCardData, {
                    onPreviewImage: handlePreviewImage,
                    onLikeIcon: handleLikeIcon,
                    onDelete: handleDeleteCard,
                }, userId);
                closeModal(constants.newCardModal);
            })
    }
    handleSubmit(makeRequest, evt, 'Создание…');
}

const handleAvatarFormSubmit = (evt) => {
    function makeRequest() {
        return setUserAvatar({
            avatar: constants.avatarInput.value,
        })
            .then((userData) => {
                constants.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
                closeModal(constants.avatarModal);
            })
    }
    handleSubmit(makeRequest, evt);
}

constants.profileForm.addEventListener('submit', handleProfileFormSubmit);
constants.newCardForm.addEventListener('submit', handleNewCardFormSubmit);
constants.avatarForm.addEventListener('submit', handleAvatarFormSubmit);
constants.cardDeleteModal.addEventListener('submit', (evt) => {
    submitFormConfirm(evt)
});

constants.addNewCardButton.addEventListener('click', () => {
    clearValidation(constants.newCardForm, constants.formValidationConfig);
    constants.newCardForm.reset();
    openModal(constants.newCardModal)
});
constants.editProfileButton.addEventListener('click', () => {
    clearValidation(constants.profileForm, constants.formValidationConfig);
    constants.profileTitleInput.value = constants.profileTitle.textContent;
    constants.profileDescriptionInput.value = constants.profileDescription.textContent;
    openModal(constants.profileModal);
});
constants.profileAvatar.addEventListener('click', () => {
    clearValidation(constants.avatarForm, constants.formValidationConfig);
    constants.avatarForm.reset();
    openModal(constants.avatarModal);
});

constants.popups.forEach(setCloseModalEventListeners);

enableValidation(constants.formValidationConfig);

Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userData]) => {
        userId = userData._id;
        constants.profileTitle.textContent = userData.name;
        constants.profileDescription.textContent = userData.about;
        constants.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

        cards.forEach((item) => {
            renderCard(item, {
                onPreviewImage: handlePreviewImage,
                onLikeIcon: handleLikeIcon,
                onDelete: handleDeleteCard,
            }, userId);
        });
    })
    .catch(console.error);