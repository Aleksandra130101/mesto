const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCards = document.querySelector('.popup_cards');
const openPopupProfile = document.querySelector('.profile__edit-button');
const openPopupCard = document.querySelector('.profile__add-button');
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
const elements = document.querySelector('.elements');
const elemTemplate = document.querySelector('#element-template').content;
const popupFigure = document.querySelectorAll('.popup-figure');
const figureImage = document.querySelector('.popup-figure__image');
const figureText = document.querySelector('.popup-figure__text');
const figureClose = document.querySelector('.popup-figure__close');
const figureOpen = document.querySelector('.popup-figure_open');


//Открытие попапов

function openPopups (popup) {
  popup.classList.add('popup_opened');
  setEventListenersOverlay(popup);
  document.addEventListener('keydown', closePopupEscape); 
}

openPopupProfile.addEventListener('click', () => {
  openPopups(popupProfile);
  createForm();
});

openPopupCard.addEventListener('click', () => {
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
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
}


//создание карточки, установка слушаетелей, добавление карточки на экран
render();

  function render() {
    initialCards.forEach((card) =>
    {renderCard(card.name, card.link)});
  }

  function createCard(name, link) {
    const element = elemTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = link;
    element.querySelector('.element__title').textContent = name;
    element.querySelector('.element__image').alt = name;
    addListenersForItem(element);
    return element;
  }

  function renderCard(name, link) {
    elements.prepend(createCard(name,link));
  }
  
  function addListenersForItem(item) {
    const buttonDelete = item.querySelector('.element__trash');
    buttonDelete.addEventListener('click', deleteCard);
    const buttonLike = item.querySelector('.element__like');
    buttonLike.addEventListener('click', likeCard);
    const photoOpen = item.querySelector('.element__image');
    photoOpen.addEventListener('click', renderFigure);
  }

  
//Удаление карточки
  function deleteCard(event) {
    const card = event.target.closest('.element');
    card.remove();
  };


//Добавление карточки

function addCard(evt) {
  evt.preventDefault();
  if ((!(nameInputCards.value === "")) && (!(linkInputCards.value === ""))) {
  renderCard(nameInputCards.value, linkInputCards.value)
  };
  nameInputCards.value = "";
  linkInputCards.value = "";
  closePopup(popupCards);
};

popupFormCard.addEventListener('submit', addCard);

//Установка лайка

function likeCard(evt) {
  const like = evt.target;
  like.classList.toggle('element__like_black');
}

//Функция добавление класса для открытия карточки
function openPopupFigure(popupFigure) {
  popupFigure.classList.add('popup-figure_opened');
  setEventListenersFigureOverlay(figureOpen);
  document.addEventListener('keydown', closePopupFigureEscape);
}

//popup-figure(попап картинки)

function renderFigure(evt) {
  figureImage.src = evt.target.src; 
  figureText.textContent = evt.target.closest('.element').textContent;
  figureImage.alt = evt.target.closest('.element').textContent;
  openPopupFigure(figureOpen);
}


//Функция добавления класса для закрытия попапа карточки
function closePopupFigure(popupFigure) {
  popupFigure.classList.remove('popup-figure_opened');
  document.removeEventListener('keydown', closePopupFigureEscape);
};


//Закрытие попап figure при нажатием на Escape

function closePopupFigureEscape(evt) {
  if (evt.key === 'Escape') {
    const popupFigureOpen = document.querySelector('.popup-figure_opened');
    closePopupFigure(popupFigureOpen);
  }
}

//Закрытие попапов figure через overlay

function closePopupFigureOverlay(event) {
  if (event.target.classList.contains('popup-figure_opened')) {
    closePopupFigure(event.target);
  }
}

////Вешаем слушатель на overlay figure

function setEventListenersFigureOverlay(element) {
  element.addEventListener('mousedown', closePopupFigureOverlay);
}


//Функция добавления слушателя для закрытия попапа карточки
  figureClose.addEventListener('click', () => {
    closePopupFigure(figureOpen);  
  });





