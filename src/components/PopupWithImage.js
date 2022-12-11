import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

    }

    open(name, link) {
        const figureImage = document.querySelector('.popup__figure-image');
        figureImage.src = link;
        const figureText = document.querySelector('.popup__figure-text');
        figureText.textContent = name;
        super.open();
    }
    
}