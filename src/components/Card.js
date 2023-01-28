
export class Card {
    constructor(data, templateSelector, handleCardClick, userId) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._userId = userId._id;
        this._owner = data.owner._id;
        this._templateSelector = templateSelector;

        this._handleOpenImagePopup = handleCardClick;

    }
    
    //получаем разметку
    _getTamplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    /*_handlePreviewFigure(name, link) {
        //const figureImage = document.querySelector('.popup__figure-image');
        //figureImage.src = this._link;
        //const figureText = document.querySelector('.popup__figure-text');
        //figureText.textContent = this._name;
        const popupFigure = document.querySelector('.popup_figure');
        this._handleOpenImagePopup(popupFigure);
    }*/

    //удаление карточки
    _handleDelateCard() {
        this._element.remove();
        this._element = null;
    }

    //Установка лайка
    _handleLikeCard() {
        this._buttonLike.classList.toggle('element__like_black');
    }

    //Вешаем слушатели
    _setEventListeners() {
        this._buttonDelete = this._element.querySelector('.element__trash');
        this._buttonDelete.addEventListener('click', () => {
            this._handleDelateCard();
        })

        this._buttonLike = this._element.querySelector('.element__like');
        this._buttonLike.addEventListener('click', () => {
            this._handleLikeCard();
        })

        this._image = this._element.querySelector('.element__image');
        this._image.addEventListener('click', () => {
            this._handleOpenImagePopup(this._name, this._link);
        })
    }

    _owner() {

    }


    //Создание карточки
    createCard() {
        this._element = this._getTamplate(); 
        this._element.querySelector('.element__title').textContent = this._name;

        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._image.alt = this._name;

        const likeCounter = this._element.querySelector('.element__number');
        likeCounter.textContent = this._likes.length;

        this._setEventListeners();
        
        //if (this._userId === this._owner) {
          //  this._element.querySelector('.element__trash').classList.add('element__trash_opened');
        //}
        

        return this._element;
    }
}