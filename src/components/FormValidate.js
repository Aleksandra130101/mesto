export class FormValidate {
    constructor(settings, formElement) {
        this._formElement = formElement;

        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._inputLists = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    //Функция показыввает ошибки
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    //Функция скрывает ошибки
    _hideInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    //Функция проверки формы на валидность
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
          } else {
            this._hideInputError(inputElement, inputElement.validationMessage);
          }
    }

    _hasInvalidInput() {
        return this._inputLists.some(function (inputElement) {
            return !inputElement.validity.valid;
          });
    }

    disabileActiveButtonClass() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    }

    disabileInactiveButtonClass() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disabileInactiveButtonClass();
          } else {
            this.disabileActiveButtonClass();
          }
    }

    //Функция удаления ошибок при открытии попапа
    removeError(element) {
        element.querySelectorAll('.popup__input-error').forEach((span) => {
            span.classList.remove('popup__input-error_active');
            span.textContent = '';
        });
        element.querySelectorAll('.popup__input').forEach((input) => {
            input.classList.remove('popup__input-error_type');
        });
    }

    //Слушатели на все инпуты
    _setEventListeners() {
        this._toggleButtonState();

        this._inputLists.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}
