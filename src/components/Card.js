export const Card = class {
    constructor(data, templateSelector, handleCardClick, handleTrashClick, userId) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._userId = userId;
        this._cardId = data._id;
        this._owner = data.owner._id;
        this._templateSelector = templateSelector;

        this._handleOpenImagePopup = handleCardClick;
        this._handleTrashClick = handleTrashClick;
    }
    
    //получаем разметку
    _getTamplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    //получить id

    getCardId() {
        return this._cardId;
    }


    //удаление карточки
    handleDeleteCard(data) {
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
            this._handleTrashClick(this._data);
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

    _showTrash() {
        if (this._userId === this._owner) {
            this._element.querySelector('.element__trash').classList.add('element__trash_opened');
        }
    }


    //Создание карточки
    createCard() {
        this._element = this._getTamplate(); 
        this._element.querySelector('.element__title').textContent = this._name;

        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._image.alt = this._name;

        const likeCounter = this._element.querySelector('.element__number');
        //likeCounter.textContent = this._likes.length;

        this._setEventListeners();
        
        this._showTrash();

        return this._element;
    }
}