import { FormValidate } from "./components/FormValidate.js";
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';

import { initialCards } from "./components/constants.js";
import './pages/index.css';

//константы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCards = document.querySelector('.popup_cards');
const popupOpenProfile = document.querySelector('.profile__edit-button');
const popupOpenCard = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_name_value');
const jobInput = document.querySelector('.popup__input_desc_value');
const elements = document.querySelector('.elements');

const cardValidate = popupCards.querySelector('.popup__form');
const profileValidate = popupProfile.querySelector('.popup__form');

//список инструментов для валидации ворм
 const validateSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error_type',
  errorClass: 'popup__input-error_active',
};

//создание экземпляров форм
const formCardValidate = new FormValidate(validateSettings, cardValidate);
const formProfileValidate = new FormValidate(validateSettings, profileValidate);

//валидация форм
formCardValidate.enableValidation();
formProfileValidate.enableValidation();


const cardsList = new Section( {
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = new Card(item, '#element-template', handleOpenImage);
    const cardElement  = card.createCard();
    cardsList.addItem(cardElement);
  }
}, elements);

cardsList.renderItems();


//открытия попапа с карточкой

function handleOpenImage(name, link) {
  popupWithImage.open(name, link);
}


//класс попапcard

const popupWithFormCard = new PopupWithForm(
  '.popup_cards',
  (inputForm) => {
    const newCardAdd = new Section({
      items: [{
        name: inputForm.nameCards,
        link: inputForm.linkCards
      }],
      renderer: (items) => {
        const card = new Card(items, '#element-template', handleOpenImage);
        const cardElement = card.createCard();
        newCardAdd.addItem(cardElement);
      }
    }, elements);
    newCardAdd.renderItems();
    popupWithFormCard.close();
  }
  );

//попапProfile

const popupWithFormProfile = new PopupWithForm(
  '.popup_profile',
  (inputForm) => {
    inputValues.setUserInfo(inputForm);
    popupWithFormProfile.close();
  }  
  );

const inputValues = new UserInfo( { 
  nameSelector: '.profile__title', 
  jobSelector: '.profile__subtitle'
});

//попапImage

const popupWithImage = new PopupWithImage('.popup_figure');


//Открытие попапов

popupOpenProfile.addEventListener('click', () => {
  popupWithFormProfile.open();
  const formValues =  inputValues.getUserInfo();
  nameInput.value = formValues.name;
  jobInput.value = formValues.job;
});

popupOpenCard.addEventListener('click', () => {
  popupWithFormCard.open();
});

