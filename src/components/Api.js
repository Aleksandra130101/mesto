export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          headers: this._headers,
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          }); 
      }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          }); 
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
          }); 
    }

    updateAvatar(avatar) {
      console.log(avatar);
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar.nameCards,
        }),
      })
      .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      }); 
    }

    addNewCard(user) {
      console.log(user);
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: user.nameCards,
                link: user.linkCards
            }),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
          }); 
    }

    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        })
        .catch((err) => {
            console.log(err);
          }); 
      }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
          })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
          })
          .catch((err) => {
              console.log(err);
            }); 
    }

    deleteCard(id) {
      console.log(id);
      return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
          console.log(err);
        }); 
    }
}