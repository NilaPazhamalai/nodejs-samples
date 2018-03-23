var apiClass = require('./async-class-api.js');

const api = new apiClass.Api();

console.log(api);

// Nested promise call back example
function callbackHell() {
    api.getUser()
        .catch()
        .then(function (user) {
            api.getFriends(user.id)
                .catch()
                .then(function (friends) {
                    if (friends.length > 1) {
                        api.getPhoto(friends[0].id)
                            .catch()
                            .then(function (photo) {
                                console.log('callbackHell', { user, friends })
                                console.log('callbackHell : photo: of friend ' + friends[0].name + " : " + photo);

                            })
                    }
                })
        })
}

callbackHell();
//Promise chaining

function promiseChaining() {
    let user, friends;
    api.getUser()
        .catch()
        .then((returnedUser) => {
            user = returnedUser;
            return api.getFriends(returnedUser.id);
        })
        .catch()
        .then((returnedFriends) => {
            friends = returnedFriends;
            if (returnedFriends.length > 1) {
                return api.getPhoto(returnedFriends[0].id);
            }
        })
        .catch()
        .then((returnedPhoto) => {
            console.log('promise chain', { user, friends })
            console.log('promise chain: photo of friend ' + friends[0].name + " : " + returnedPhoto);

        })
}

promiseChaining();

// async await
async function getUserDetails() {
    const user = await api.getUser();
    const friends = await api.getFriends(user.id);
    const photo = await api.getPhoto(friends[0].id);
    console.log('async await', { user, friends })
    console.log('async await: photo of friend ' + friends[0].name + " : " + photo);
}

getUserDetails();

async function getDetailsParallel(){
    const user = await api.getUser();
    Promise.all([api.getFriends(user.id), api.getPhoto(user.id)])
    .catch()
    .then(function (arr){
        var friends = arr[0];
        var photo = arr[1];
        console.log('async parallel', { user, friends })
        console.log('async await: photo of friend ' + friends[0].name + " : " + photo);
    })
}

getDetailsParallel();