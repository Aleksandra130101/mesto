let popap = document.querySelector('.popap');
let openpopap = document.querySelector('.profile__EditButton');
let closepopap = document.querySelector('.popap__close');
let formElement = document.querySelector('.popap__form');
let nameInput = document.querySelector('.popap__input-name');
let jobInput = document.querySelector('.popap__input-desc');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let addpopap = document.querySelector('.profile__EditButton')


openpopap.addEventListener ('click', function() {
    popap.classList.add('popap__opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
} );

closepopap.addEventListener ('click', function() {
    popap.classList.remove('popap__opened');
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 

