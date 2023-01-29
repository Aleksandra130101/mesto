export class UserInfo {
    constructor( { nameSelector, jobSelector, avatarSelector }  ) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
        this._name = document.querySelector(this._nameSelector);
        this._job = document.querySelector(this._jobSelector);
        this._avatar = document.querySelector(this._avatarSelector);

    }

    getUserInfo() {
        const userProfile = {};
        userProfile.name = this._name.textContent;
        userProfile.job = this._job.textContent;

        return userProfile;
    }

    setUserInfo(values) {
        this._name.textContent = values.name;
        this._job.textContent = values.about;
        this._userId = values._id;

        this._avatar.src = values.avatar;
        
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }

    getUserId() {
        return this._userId;
    }
}