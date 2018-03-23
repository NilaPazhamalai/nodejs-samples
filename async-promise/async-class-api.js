function Api() {
    this.user = { id: 1, name: "John" };
    this.friends = [this.user, this.user, this.user, this.user];
    this.photo = " Downloaded photograph of " + this.user.name;
}

Api.prototype.getUser = function () {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve(this.user);
            }, 200);
        }
    );
}

Api.prototype.getFriends = function (userId) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve(this.friends.slice());
            }, 200);
        }
    );
}


Api.prototype.getPhoto = function (userId) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve(this.photo);
            }, 200);
        }
    );
}


Api.prototype.throwError = function () {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                reject(new Error("To check if rejection works!!!!"));
            }, 200);
        }
    );
}

module.exports = {
    Api : Api
}