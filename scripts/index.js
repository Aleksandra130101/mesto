const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCards = document.querySelector('.popup_cards');
const openpopupProfile = document.querySelector('.profile__edit-button');
const openpopupCard = document.querySelector('.profile__add-button');
const closepopup = document.querySelectorAll('.popup__close');
const closepopupProfile = document.querySelector('.popup__close_profile');
const closepopupCard = document.querySelector('.popup__close_card');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name_value');
const jobInput = document.querySelector('.popup__input_desc_value');
const nameInputCards = document.querySelector('.popup__input_name_cards');
const linkInputCards = document.querySelector('.popup__input_desc_cards');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const addpopup = document.querySelector('.popup__button_edit');

//Открытие попап

function openpopups (popup) {
  popup.classList.add('popup_opened')
}

openpopupProfile.addEventListener('click', () => {
  openpopups(popupProfile);
  form();
});

openpopupCard.addEventListener('click', () => {
  openpopups(popupCards);
});

//Функция заполнения формы "редактирование профиля"
function form() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}


//Закрытие попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

closepopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);  
});

closepopupCard.addEventListener('click', () => {
  closePopup(popupCards);
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

addpopup.addEventListener('click', formSubmitHandler); 

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const elements = document.querySelector('.elements');
  const elemTemplate = document.querySelector('#element-template').content;

render();

  function render() {
    initialCards.forEach(renderItem);
  }

  function renderItem(card) {
    const element = elemTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = card.link;
    element.querySelector('.element__title').textContent = card.name;
    listenersForItem(element);
    elements.appendChild(element);
  }

  function listenersForItem(item) {
    const deletebutton = item.querySelector('.element__trash');
    deletebutton.addEventListener('click', deleteCard);
    const likebutton = item.querySelector('.element__like');
    likebutton.addEventListener('click', likeCard);
    const openPhoto = item.querySelector('.element__image');
    openPhoto.addEventListener('click', renderFigure);
  }

  
//Удаление карточки
  function deleteCard(event) {
    const card = event.target.closest('.element');
    card.remove();
  };


//Добавление карточки
const popupAddCard = document.querySelector('.popup__button_add');

function addCard(evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = linkInputCards.value;
  cardElement.querySelector('.element__image').alt = nameInputCards.value;
  cardElement.querySelector('.element__title').textContent = nameInputCards.value;
  if ((!(nameInputCards.value === "")) && (!(nameInputCards.value === ""))) {
  elements.prepend(cardElement);
  listenersForItem(cardElement);
  };
  closePopup(popupCards);
};

popupAddCard.addEventListener('click', addCard);

//Установка лайка

function likeCard(evt) {
  const like = evt.target;
  like.classList.toggle('element__like_black');
}


//popup-figure(попап картинки)
const popupFigure = document.querySelector('.popup-figure');
const figureImage = document.querySelector('.popup-figure__image');
const figureText = document.querySelector('.popup-figure__text');

function renderFigure(evt) {
  figureImage.src = evt.target.src; 
  figureText.textContent = evt.target.closest('.element').textContent;
  figureImage.alt = evt.target.closest('.element').textContent;
  openPopupFigure();
  closeFigure();
}

//Функция добавление класса для открытия карточки
function openPopupFigure() {
  popupFigure.classList.add('popup-figure_opened');
}

//Функция добавления слушателя для закрытия попапа карточки
function closeFigure() {
  let figureClose = document.querySelector('.popup-figure__close');
  figureClose.addEventListener('click', closePopupFigure);
}

//Функция добавления класса для закрытия попапа карточки
function closePopupFigure() {
  popupFigure.classList.remove('popup-figure_opened');
}




















  

