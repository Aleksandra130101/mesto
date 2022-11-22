export class Card {
    constructor(data, templateSelector, openPopups) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;

        this._openPopups = openPopups;
    }
    
    //получаем разметку
    _getTamplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    _handlePreviewFigure() {
        const figureImage = document.querySelector('.popup__figure-image');
        figureImage.src = this._link;
        const figureText = document.querySelector('.popup__figure-text');
        figureText.textContent = this._name;
        const popupFigure = document.querySelector('.popup_figure');
        this._openPopups(popupFigure);
    }

    //удаление карточки
    _handleDelateCard() {
        this._element.remove();
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

        this._image.addEventListener('click', () => {
            this._handlePreviewFigure();
        })
    }


    //Создание карточки
    createCard() {
        this._element = this._getTamplate(); 
        this._element.querySelector('.element__title').textContent = this._name;
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._setEventListeners();
        
        return this._element;
    }
}