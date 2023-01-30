import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._figureImage = this._popup.querySelector('.popup__figure-image');
        this._figureText = this._popup.querySelector('.popup__figure-text');
    }

    open(name, link) {
        this._figureImage.src = link;
        this._figureText.textContent = name;
        this._figureText.alt = name;
        super.open();
    }
    
}