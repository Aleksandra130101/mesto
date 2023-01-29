import {Popup} from '../components/Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._form = this._popup.querySelector('.popup__form');
    }

    open() {
        super.open();
    }

    setSubmitAction(action) {
        console.log(action);
        this._some = action;
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._some();
        });

    }

    close() {
        super.close();
     }
}