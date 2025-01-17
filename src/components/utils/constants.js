export const formValidationConfig = {
    formSelector: '.popup__form',
    fieldsetSelector: '.popup__set',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-type-error',
    errorClass: 'popup__input-error_visible'
}

export const placesWrap = document.querySelector('.places__list');
export const popups = document.querySelectorAll('.popup');

// POPUP: add new card
export const newCardModal = document.querySelector('.popup_type_new-card');
export const newCardForm = document.forms['new-place'];
export const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
export const newCardLinkInput = newCardForm.querySelector('.popup__input_type_url');
export const newCardSubmitButton = newCardForm.querySelector("[type='submit']");

// POPUP: delete card
export const cardDeleteModal = document.querySelector('.popup_type_remove-card');
export const cardDeleteSubmitButton = cardDeleteModal.querySelector("[type='submit']");

// POPUP: edit profile info
export const profileModal = document.querySelector('.popup_type_edit');
export const profileForm = document.forms['edit-profile'];
export const profileTitleInput = profileForm.querySelector('.popup__input_type_name');
export const profileDescriptionInput = profileForm.querySelector('.popup__input_type_description');
export const profileSubmitButton = profileForm.querySelector("[type='submit']");

// POPUP: edit avatar
export const avatarModal = document.querySelector('.popup_type_edit-avatar');
export const avatarForm = document.forms['avatar-upload'];
export const avatarInput = avatarForm.querySelector('.popup__input');
export const avatarSubmitButton = avatarForm.querySelector("[type='submit']");

// POPUP: image fullscreen
export const imageModal = document.querySelector('.popup_type_image');
export const imageElement = document.querySelector('.popup__image');
export const imageCaption = document.querySelector('.popup__caption');

// BUTTONS: add new card & edit profile info
export const addNewCardButton = document.querySelector('.profile__add-button');
export const editProfileButton = document.querySelector('.profile__edit-button');

// Profile info
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__image');