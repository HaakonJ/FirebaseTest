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

const LoginMessage = document.getElementById('LoginMessage');
const map = document.getElementById('map');
const btnScan = document.getElementById('btnScan');

const nRef = firebase.database().ref();
const eggs = nRef.child('eggs');

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
        console.log(firebaseUser);
        LoginMessage.classList.add('hide');
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignUp.classList.add('hide');
        frmName.classList.add('hide');
        frmEmail.classList.add('hide');
        frmPassword.classList.add('hide');
        frmUserName.classList.remove('hide');
        btnScan.classList.remove('hide');
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
        btnScan.classList.add('hide');
    }
});

const scannedEggs = document.getElementById('scannedEggs');


firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {

        function errorCallback(error) {
            alert('ERROR(' + error.code + '): ' + error.message);
        };

        btnScan.addEventListener('click', e => {
                var output = document.getElementById("");

                if (!navigator.geolocation) {
                    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                    return;
                }

                function success(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var found = longitude + "," + latitude;
                    const map = document.getElementById('map');
                    const dbUserRef = firebase.database().ref();
                    // map.src = 'https://www.arcgis.com/home/webmap/viewer.html?webmap=ee17122bc13e41e2977d75ef541647dc&extent=-122.3642,47.7973,' + found + '&level=18&marker=' + found;

                    eggs.orderByChild('egg').on('child_added', function(snap) {
                        if (snap.val().longitude >= (longitude - 0.0001) && snap.val().longitude <= (longitude + 0.0001) && snap.val().latitude >= (latitude - 0.0001) && snap.val().latitude <= (latitude + 0.0001)) {
                            //console.log('Egg' + snap.val().egg + 'Bool')
                            //console.log(latitude, longitude)
                            const dbUserRef = firebase.database().ref();

                            const dbUser = dbUserRef.child('users').child(firebaseUser.uid);

                            const dbUserEggID = dbUserRef.child('users').child(firebaseUser.uid).child('eui').child('eui');

                            const dbRecent = dbUserRef.child('users').child(firebaseUser.uid).child('recentEggs');

                            const eggUIDIndex = snap.val().egg;

                            dbUserEggID.on('value', function(snap) {

                                if (eggUIDIndex >= 100 && snap.val().charAt(eggUIDIndex - 51) == "0") {
                                    //console.log(snap.val().indexOf("0", 50));
                                    var n = snap.val().substring(0, eggUIDIndex - 51) + "1" + snap.val().substring(eggUIDIndex - 50);
                                    //console.log(snap.val());
                                    //console.log(eggUIDIndex);
                                    //console.log(n);

                                    dbUserRef.child('users').child(firebaseUser.uid).child('eui').set({
                                        eui: n
                                    });

                                    //Date.now() gives you the number of milliseconds since january 1 1970 since the newest scanned egg will always be the largest meaning that it will always show up in most recent eggs in profile
                                    //dbUserRef.child('users').child(firebaseUser.uid).set({ eui: n });

                                    const scanned = document.getElementById('scanned');
                                    const updateCard = document.getElementById('updateCard');

                                    scanned.innerText = 'Egg ' + eggUIDIndex + ' has been scanned!';
                                    const br = document.createElement('br');
                                    scanned.appendChild(br);

                                    const img = document.createElement('img');
                                    img.classList.add('eggImage');
                                    img.setAttribute("style", "margin-top:10px;");
                                    img.title = 'egg' + eggUIDIndex;

                                    ////until more images are added this is here so that if any eggs that are listed as greater or less than 101 to 103 have an image
                                    ////when new images are added all you will need to do is save an image with the number of the egg and a string value that is static and it will pick it up.
                                    img.src = 'images/TestEgg' + eggUIDIndex + '.png';
                                    if (eggUIDIndex <= 100 || eggUIDIndex >= 104) {
                                        img.src = 'images/TestEgg102.png';
                                    } else {
                                        img.src = 'images/TestEgg' + eggUIDIndex + '.png';
                                    }
                                    ////similarly to the image if the name of a website contains the egg value then it should be able to be pulled up this way.
                                    //img.href = 'https://haakonj.github.io/Prototype-Firebase-App/egg' + snap.val().eggNum + '.html'

                                    scanned.appendChild(img);

                                    updateCard.classList.remove('hide');
                                };
                            });
                        }
                    });
                }

                function error() {
                    //document.getElementById('map').src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,-122.3463,47.8138';
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
    }
});

const btnHide = document.getElementById('btnHide');
btnHide.addEventListener('click', e => {
    updateCard.classList.add('hide');
});