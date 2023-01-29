import { FormValidate } from "../components/FormValidate.js";
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';

import { initialCards } from "../utils/constants.js";
import './index.css';

//константы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCards = document.querySelector('.popup_cards');
const popupAvatar = document.querySelector('.popup_change-avatar');
const formCard = document.querySelector('.popup__form_card');

const popupOpenProfile = document.querySelector('.profile__edit-button');
const popupOpenCard = document.querySelector('.profile__add-button');
const popupOpenAvatar = document.querySelector('.profile__avatar');
const nameInput = document.querySelector('.popup__input_name_value');
const jobInput = document.querySelector('.popup__input_desc_value');
const elements = document.querySelector('.elements');
const likeId = document.querySelector('.element__number');

const cardValidate = popupCards.querySelector('.popup__form_card');
const profileValidate = popupProfile.querySelector('.popup__form_profile');
const avatarValidate = popupAvatar.querySelector('.popup__form_change-avatar');

//список инструментов для валидации ворм
 const validateSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error_type',
  errorClass: 'popup__input-error_active',
};

const form = popupProfile.querySelector(validateSettings.formSelector);

//Api

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: '18c1f460-1209-46d8-b484-04ad7ddb3f47',
    'Content-Type': 'application/json'
  },
});


//создание экземпляров форм
const formCardValidate = new FormValidate(validateSettings, cardValidate);
const formProfileValidate = new FormValidate(validateSettings, profileValidate);
const formAvatarValidate = new FormValidate(validateSettings, avatarValidate);

//валидация форм
formCardValidate.enableValidation();
formProfileValidate.enableValidation();
formAvatarValidate.enableValidation();

const validators = {};


function createCard(item) {
  const card = new Card(item, '#element-template', handleOpenImage,
  (data) => {
    popupDeleteCard.open();
    popupDeleteCard.setEventListeners();
    popupDeleteCard.setSubmitAction(() => {
      api.deleteCard(data._id)
      .then(() => {
        card.handleDeleteCard(data);
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(`При удалении карточки: ${err}`)
      })
    })
  },
  userInfo.getUserId());

  return card.createCard();;
}

  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((arg) => {
      const [ user, cards] = arg;
      userInfo.setUserInfo(user);
      userInfo.setUserAvatar(user.avatar);
      const cardsList = new Section({
        items: cards.reverse(),
        renderer: (item) => {
          cardsList.addItem(createCard(item));
        }
      }, elements);
      
      cardsList.renderItems();
    })
    .catch((err) => {
      console.log(err);
    })

//открытия попапа с карточкой

function handleOpenImage(name, link) {
  popupWithImage.open(name, link);
}

//класс попапcard

const popupWithFormCard = new PopupWithForm(
  '.popup_cards',
  (inputForm) => {
    popupWithFormCard.setSubmitButtonText(true),
    api.addNewCard(inputForm)
      .then((data) => {
        const newCardAdd = new Section({
          items: [data],
          renderer: (item) => {      
            newCardAdd.addItem(createCard(item));
          }
        }, elements);
        newCardAdd.renderItems();
        popupWithFormCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(popupWithFormCard.setSubmitButtonText(false));
      });

//попапProfile

const popupWithFormProfile = new PopupWithForm(
  '.popup_profile',
  (inputForm) => {
    popupWithFormProfile.setSubmitButtonText(true);
    api.updateUserInfo(inputForm)
      .then((user) => {
        userInfo.setUserInfo(user);
        popupWithFormProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(popupWithFormProfile.setSubmitButtonText(false));
  });

//попап аватар

const popupChangeAvatar = new PopupWithForm(
  '.popup_change-avatar',
  (inputForm) => {
    popupChangeAvatar.setSubmitButtonText(true),
    api.updateAvatar(inputForm)
      .then((user) => {
        userInfo.setUserInfo(user);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(popupChangeAvatar.setSubmitButtonText(false));
  });

//попап удаления карточки

const popupDeleteCard = new PopupDeleteCard('.popup_delete');

function handleSubmitForm(data) {
  data.handleDeleteCard();
}


popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupChangeAvatar.setEventListeners();


const userInfo = new UserInfo( { 
  nameSelector: '.profile__title', 
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
});


//попапImage

const popupWithImage = new PopupWithImage('.popup_figure');

popupWithImage.setEventListeners();


//Открытие попапов

popupOpenProfile.addEventListener('click', () => {
  formProfileValidate.removeError(profileValidate);
  const formValues =  userInfo.getUserInfo();
  nameInput.value = formValues.name;
  jobInput.value = formValues.job;
  popupWithFormProfile.open();
});

popupOpenCard.addEventListener('click', () => {
  formCardValidate.disabileInactiveButtonClass();
  formCardValidate.removeError(cardValidate);
  popupWithFormCard.open();
});

popupOpenAvatar.addEventListener('click', () => {
    formAvatarValidate.disabileActiveButtonClass();
    formAvatarValidate.removeError(avatarValidate);
    popupChangeAvatar.open();
})
