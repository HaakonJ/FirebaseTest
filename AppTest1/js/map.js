src = "https://www.gstatic.com/firebasejs/4.5.0/firebase.js" 
    // Initialize Firebase
var config = {   apiKey: "AIzaSyCnyv5HubWOmjjO1-5SwnduU0H_R_R4kd0",   authDomain: "egg-collection-database.firebaseapp.com",   databaseURL: "https://egg-collection-database.firebaseio.com",   projectId: "egg-collection-database",   storageBucket: "egg-collection-database.appspot.com",   messagingSenderId: "56187974224"  }; 
firebase.initializeApp(config);

//Get elements
const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtUserName = document.getElementById('txtUserName');
const frmName = document.getElementById('frmName');
const frmEmail = document.getElementById('frmEmail');
const frmPassword = document.getElementById('frmPassword');
const frmUserName = document.getElementById('frmUserName');
const txtLogin = document.getElementById('btnLogin');
const txtSignUp = document.getElementById('btnSignUp');
const txtLogout = document.getElementById('btnLogout');

const map = document.getElementById('map');
const btnFind = document.getElementById('btnFind');
const LoginMessage = document.getElementById('LoginMessage');

//Add Login Event
btnLogin.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

//Add signup event
btnSignUp.addEventListener('click', e => {
    //Get email and pass
    //TODO: Check for real Emails

    const name = txtName.value;
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

    const dbUserRef = firebase.database().ref();

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: name,
                email: email

            }).then(function() {
                console.log(user.displayName);
            }).catch(function(error) {

            });

            dbUserRef.child('users').child(firebaseUser.uid).set({
                UserName: name,
                Email: email,
                eui: {
                    eui: "000000000000000000000000000000000000000000000000000000"
                },
                recentEggs: {
                    RE1: {
                        collectionDate: new Date().getTime(),
                        eggNum: 0
                    },
                    RE2: {
                        collectionDate: new Date().getTime(),
                        eggNum: 0
                    },
                    RE3: {
                        collectionDate: new Date().getTime(),
                        eggNum: 0
                    },
                    RE4: {
                        collectionDate: new Date().getTime(),
                        eggNum: 0
                    },
                    RE5: {
                        collectionDate: new Date().getTime(),
                        eggNum: 0
                    }
                }
            });
        }
    });
});

//
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});

//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        LoginMessage.classList.add('hide');
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignUp.classList.add('hide');
        frmName.classList.add('hide');
        frmEmail.classList.add('hide');
        frmPassword.classList.add('hide');
        frmUserName.classList.remove('hide');
    } else {
        console.log('not Logged in');
        LoginMessage.classList.remove('hide');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignUp.classList.remove('hide');
        frmName.classList.remove('hide');
        frmEmail.classList.remove('hide');
        frmPassword.classList.remove('hide');
        frmUserName.classList.add('hide');
        map.classList.add('hide');
    }
});

//to redirect iframe src
//document.getElementById('map').src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,' + 'geolocation';

function errorCallback(error) {
    alert('ERROR(' + error.code + '): ' + error.message);
};

btnFind.addEventListener('click', e => {
        var output = document.getElementById("");

        if (!navigator.geolocation) {
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }

        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var found = longitude + "," + latitude;
            //document.getElementById('map').src = 'https://www.arcgis.com/home/webmap/viewer.html?webmap=ee17122bc13e41e2977d75ef541647dc&extent=-122.3642,47.7973,' + found + '&level=18&marker=' + found;

            var radlat1 = Math.PI * latitude / 180;
            var radlat2 = Math.PI * (latitude + .0002) / 180;
            var theta = longitude - (longitude + .0002);
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            distFinal = dist * 5280;

            //console.log(" Geolocation:  " + found);

            //console.log("   Distance between two Geolocations:  " + distFinal);
        }

        function error() {
            //document.getElementById('map').src = 'http://www.arcgis.com/apps/webappviewer/index.html?id=4abca8e4a6bd40119c2515c1a8ebe07c&extent=-13619801.2375%2C6075299.3948%2C-13608335.6833%2C6080783.7516%2C102100';
        }

        navigator.geolocation.getCurrentPosition(success, error);
    },

    function prompt(window, pref, message, callback) {
        let branch = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);

        if (branch.getPrefType(pref) === branch.PREF_STRING) {
            switch (branch.getCharPref(pref)) {
                case "always":
                    return callback(true);
                case "never":
                    return callback(false);
            }
        }

        let done = false;

        function remember(value, result) {
            return function() {
                done = true;
                branch.setCharPref(pref, value);
                callback(result);
            }
        }

        let self = window.PopupNotifications.show(
            window.gBrowser.selectedBrowser,
            "geolocation",
            message,
            "geo-notification-icon", {
                label: "Share Location",
                accessKey: "S",
                callback: function(notification) {
                    done = true;
                    callback(true);
                }
            }, [{
                    label: "Always Share",
                    accessKey: "A",
                    callback: remember("always", true)
                },
                {
                    label: "Never Share",
                    accessKey: "N",
                    callback: remember("never", false)
                }
            ], {
                eventCallback: function(event) {
                    if (event === "dismissed") {
                        if (!done) callback(false);
                        done = true;
                        window.PopupNotifications.remove(self);
                    }
                },
                persistWhileVisible: true
            });
    });