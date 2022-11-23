import { FormValidate } from "./FormValidate.js";
import { Card } from './Card.js';

import { initialCards } from "./constants.js";

//константы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCards = document.querySelector('.popup_cards');
const popupOpenProfile = document.querySelector('.profile__edit-button');
const popupOpenCard = document.querySelector('.profile__add-button');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupCloseCard = document.querySelector('.popup__close_card');
const nameInput = document.querySelector('.popup__input_name_value');
const jobInput = document.querySelector('.popup__input_desc_value');
const nameInputCards = document.querySelector('.popup__input_name_cards');
const linkInputCards = document.querySelector('.popup__input_desc_cards');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupFormProfile = document.querySelector('.popup__form_profile');
const popupFormCard = document.querySelector('.popup__form_card');
const popupButtonCard = document.querySelector('.popup__button_add');
const popupFigure = document.querySelector('.popup_figure');
const figureClose = document.querySelector('.popup__figure-close');
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

//проходим по массиву начальных карточек
initialCards.reverse().forEach((item) => {
  addCard(item);
});

//создание экземпляров каждой карточки и возврат их
function render(item) {
  const card = new Card(item, '#element-template', openPopups);
  const cardElement  = card.createCard();
  return cardElement;
}

//Функция добавления карточки на страницу
function addCard(item) {
  elements.prepend(render(item));
}

//рендеринг новой карточки из формы
function renderCard(evt) {
  evt.preventDefault();
  if ((!(nameInputCards.value === "")) && (!(linkInputCards.value === ""))) {
  addCard({
    name: nameInputCards.value,
    link: linkInputCards.value
  });
  };
  popupFormCard.reset();
  formCardValidate.disabileActiveButtonClass();
  closePopup(popupCards);
};

//Вешаем слушатель для добавления карточки
popupFormCard.addEventListener('submit', renderCard);


//Открытие попапов

function openPopups (popup) {
  popup.classList.add('popup_opened');
  setEventListenersOverlay(popup);
  document.addEventListener('keydown', closePopupEscape); 
}

popupOpenProfile.addEventListener('click', () => {
  openPopups(popupProfile);
  createForm();
});

popupOpenCard.addEventListener('click', () => {
  openPopups(popupCards);
});

//Функция заполнения формы "редактирование профиля"
function createForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}


//Закрытие попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
};

popupCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);  
});

popupCloseCard.addEventListener('click', () => {
  closePopup(popupCards);
});

figureClose.addEventListener('click', () => {
  closePopup(popupFigure);  
});

//функция редактирует профиль
function handleLikeClick (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

popupFormProfile.addEventListener('submit', handleLikeClick);

//Закрытие попапов через overlay
function closePopupOverlay(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}

//Вешаем слушатель на overlay
function setEventListenersOverlay(element) {
  element.addEventListener('mousedown', closePopupOverlay);
}

//Закрытие попап при нажатие на Escape
function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector(`.popup_opened`);
    closePopup(popupOpen);
  }
}

