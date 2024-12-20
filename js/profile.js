"use strict";
class Profile {
    storage;
    imgProfile;
    nameProfile;
    data;
    name;
    surname;
    img;
    constructor(storage) {
        this.storage = storage;
        this.imgProfile = this.storage.element.imgProfile;
        this.nameProfile = this.storage.element.nameProfile;
        this.getUsers();
    }
    async getUsers() {
        let users = await fetch("https://randomuser.me/api/");
        this.data = await users.json();
        this.name = this.data.results[0].name.first;
        this.surname = this.data.results[0].name.last;
        this.img = this.data.results[0].picture.medium;
        if (this.imgProfile && this.nameProfile) {
            this.imgProfile.src = `${this.img}`;
            this.nameProfile.innerHTML = `${this.name} ${this.surname}`;
        }
    }
}
