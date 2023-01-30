import { popupProfile, popupCards, popupAvatar, popupOpenProfile, popupOpenCard, popupOpenAvatar, 
  nameInput, jobInput, elements, cardValidate, profileValidate, avatarValidate, validateSettings} from '../utils/constants.js';

import { FormValidate } from "../components/FormValidate.js";
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';

import './index.css';


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


function createCard(item) {
  const card = new Card(item, '#element-template', handleOpenImage, 
  (data) => {
    if (card.likeStatus) {
      api.deleteLike(item._id)
        .then((data) => {
          card.deleteLike(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
    } else {
      api.putLike(item._id)
        .then((data) => {
          card.addLike(data)
        })
        .catch((err) => {
          console.log(`При удалении карточки: ${err}`)
        });
    }
  },
  (data) => {
    popupDeleteCard.open();
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
      const arr = cards.reverse();
      createCardList(arr);     
    })
    .catch((err) => {
      console.log(err);
    })

//Создание списка карточек
function createCardList(cards) {
   const cardsList = new Section({
      items: [cards],
      renderer: (item) => {
        cardsList.addItem(createCard(item));
      }
    }, elements);
    cardsList.renderItems(cards);
  }

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
        createCardList([data]);
        popupWithFormCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally( () => {
        popupWithFormCard.setSubmitButtonText(false)
      });
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
      .finally( () => {
        popupWithFormProfile.setSubmitButtonText(false)
      })
      
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
      .finally( () => {
        popupChangeAvatar.setSubmitButtonText(false)
      });
  });

//попап удаления карточки

const popupDeleteCard = new PopupDeleteCard('.popup_delete');

function handleSubmitForm(data) {
  data.handleDeleteCard();
}


popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupChangeAvatar.setEventListeners();
popupDeleteCard.setEventListeners();


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
  formProfileValidate.disabileInactiveButtonClass();
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
  formAvatarValidate.disabileInactiveButtonClass();
  formAvatarValidate.removeError(avatarValidate);
  popupChangeAvatar.open();
})
