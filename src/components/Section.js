export class Section {
    constructor({items, renderer}, containerSelector) {
        this._initialCards = items;
        this._renderer = renderer;
        
        this._container = containerSelector;
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
          });
    }

    addItem(element) {
        this._container.prepend(element);
    }

}