import {Popup} from '../components/Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._form = this._popup.querySelector('.popup__form');
    }

    setSubmitAction(action) {
        this._some = action;
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._some();
        });

    }
}