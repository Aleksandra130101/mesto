export class UserInfo {
    constructor( { nameSelector, jobSelector }  ) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._name = document.querySelector(this._nameSelector);
        this._job = document.querySelector(this._jobSelector);
    }

    getUserInfo() {
        const userProfile = {};
        userProfile.name = this._name.textContent;
        userProfile.job = this._job.textContent;

        return userProfile;
    }

    setUserInfo(values) {
        this._name.textContent = values.nameProfile;
        this._job.textContent = values.jobProfile;
    }
}