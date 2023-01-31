export const Card = class {
    constructor(data, templateSelector, handleCardClick, handleLike, handleTrashClick, userId) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._userId = userId;
        this.cardId = data._id;
        this._owner = data.owner._id;
        this._templateSelector = templateSelector;
        this.likeStatus = false;

        this._handleOpenImagePopup = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLike = handleLike;
    }
    
    //получаем разметку
    _getTamplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    //получить id

    getCardId() {
        return this.cardId;
    }


    //удаление карточки
    handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }


    addLike(data) {
        console.log("ADD");
        this._buttonLike.classList.add('element__like_black');
        this._likeCounter.textContent = data.likes.length;
        this.likeStatus = true;
    }

    

    deleteLike(data) {
        console.log("DELETE");
        this._buttonLike.classList.remove('element__like_black');
        this._likeCounter.textContent = data.likes.length;
        this.likeStatus = false;
        
    }

    isLiked() {
        if (this._likes.some(data => data._id === this._userId)) {
            return true;
        }
        else {
            return false;
        }
    }



    //Вешаем слушатели
    _setEventListeners() {
        this._buttonDelete = this._element.querySelector('.element__trash');
        this._buttonDelete.addEventListener('click', () => {
            this._handleTrashClick(this._data);
        })

        this._buttonLike = this._element.querySelector('.element__like');
        this._buttonLike.addEventListener('click', () => {
            this._handleLike(this._data);
        })

        this._image = this._element.querySelector('.element__image');
        this._image.addEventListener('click', () => {
            this._handleOpenImagePopup(this._name, this._link);
        })

        if (this.isLiked()) {
            this._buttonLike.classList.add('element__like_black');
            this.likeStatus = true;
        }

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

        this._likeCounter = this._element.querySelector('.element__number');
        this._likeCounter.textContent = this._likes.length;

        this._showTrash();
        this._setEventListeners();

        return this._element;
    }
}
