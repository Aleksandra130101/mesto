export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошика: ${res.status}`);
      
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          headers: this._headers,
        })
        .then(this._checkResponse);
      }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    }


    updateUserInfo(user) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: user.nameProfile,
                about: user.jobProfile,
            }),
        })
        .then(this._checkResponse);
    }

    updateAvatar(avatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar.nameCards,
        }),
      })
      .then(this._checkResponse);
    }

    addNewCard(user) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: user.nameCards,
                link: user.linkCards
            }),
        })
        .then(this._checkResponse);
    }

    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(this._checkResponse);
      }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
          })
          .then(this._checkResponse);
    }

    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
}