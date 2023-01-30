export const validateSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input-error_type',
    errorClass: 'popup__input-error_active',
    error: '.popup__input-error',
  };

//константы
export const popupProfile = document.querySelector('.popup_profile');
export const popupCards = document.querySelector('.popup_cards');
export const popupAvatar = document.querySelector('.popup_change-avatar');

export const popupOpenProfile = document.querySelector('.profile__edit-button');
export const popupOpenCard = document.querySelector('.profile__add-button');
export const popupOpenAvatar = document.querySelector('.profile__avatar');
export const nameInput = document.querySelector('.popup__input_name_value');
export const jobInput = document.querySelector('.popup__input_desc_value');
export const elements = document.querySelector('.elements');

export const cardValidate = popupCards.querySelector('.popup__form_card');
export const profileValidate = popupProfile.querySelector('.popup__form_profile');
export const avatarValidate = popupAvatar.querySelector('.popup__form_change-avatar');