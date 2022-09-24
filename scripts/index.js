let popup = document.querySelector('.popup');
let openpopup = document.querySelector('.profile__edit-button');
let closepopup = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name_value');
let jobInput = document.querySelector('.popup__input_desc_value');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let addpopup = document.querySelector('.popup__button')

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

openpopup.addEventListener ('click', popupOpen);

closepopup.addEventListener ('click', popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}

addpopup.addEventListener('click', formSubmitHandler); 

