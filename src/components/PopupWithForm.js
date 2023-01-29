import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);

        this._handleSubmitForm = handleSubmitForm;

        this._inputLists = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__button');
        this._submitButtonDefaulttext = this._submitButton.value;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputLists.forEach((input) => {
            this._formValues[input.name] = input.value;
        })

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        });
    }

    close() {
        this._form.reset();
        super.close();
     }

    setSubmitButtonText(onSaving) {
        if (onSaving) {
            this._submitButton.textContent = "Сохранение........";
            console.log(this._submitButton.textContent)
        } else {
            this._submitButton.value = this._submitButtonDefaulttext;
        }
    };
}