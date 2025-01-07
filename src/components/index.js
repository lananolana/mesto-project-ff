import '../pages/index.css';

import { initialCards } from './cards.js';
import { createCardElement, handleDeleteCard, handleLikeIcon } from './card.js';
import { openModal, closeModal, setCloseModalEventListeners } from './modal.js'

const placesWrap = document.querySelector('.places__list');

const newCardModal = document.querySelector('.popup_type_new-card');
const newCardForm = newCardModal.querySelector('.popup__form');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardForm.querySelector('.popup__input_type_url');

const profileModal = document.querySelector('.popup_type_edit');
const profileForm = profileModal.querySelector('.popup__form');
const profileTitleInput = profileForm.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileForm.querySelector('.popup__input_type_description');

const imageModal = document.querySelector('.popup_type_image');
const imageElement = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

const addNewCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const handlePreviewImage = ({ name, link }) => {
    imageElement.src = link;
    imageElement.alt = `Изображение ${name}`;
    imageCaption.textContent = name;
    openModal(imageModal);
};

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileModal);
};

const handleNewCardFormSubmit = (evt) => {
    evt.preventDefault();
    placesWrap.prepend(
        createCardElement(
            {
            name: newCardNameInput.value,
            link: newCardLinkInput.value,
            },
            {
                onPreviewImage: handlePreviewImage,
                onLikeIcon: handleLikeIcon,
                onDelete: handleDeleteCard,
            }
            )
    );

    closeModal(newCardModal);
    newCardForm.reset();
};

profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

addNewCardButton.addEventListener('click', () => {openModal(newCardModal)});
editProfileButton.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileModal);
});

initialCards.forEach(data => {
    placesWrap.append(
        createCardElement(data, {
            onPreviewImage: handlePreviewImage,
            onLikeIcon: handleLikeIcon,
            onDelete: handleDeleteCard,
        })
    );
});

setCloseModalEventListeners(newCardModal);
setCloseModalEventListeners(profileModal);
setCloseModalEventListeners(imageModal);