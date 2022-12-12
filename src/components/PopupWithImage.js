import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

    }

    open(name, link) {
        const figureImage = this._popup.querySelector('.popup__figure-image');
        figureImage.src = link;
        const figureText = this._popup.querySelector('.popup__figure-text');
        figureText.textContent = name;
        figureText.alt = name;
        super.open();
    }
    
}