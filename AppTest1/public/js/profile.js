src = "https://www.gstatic.com/firebasejs/4.8.1/firebase.js"
    // Initialize Firebase
var config = {
    apiKey: "AIzaSyAsyh_IJt-wRUj7DOwTClxef0Z5X7A2uk0",
    authDomain: "eggsplorelynnwood-1be9e.firebaseapp.com",
    databaseURL: "https://eggsplorelynnwood-1be9e.firebaseio.com",
    projectId: "eggsplorelynnwood-1be9e",
    storageBucket: "eggsplorelynnwood-1be9e.appspot.com",
    messagingSenderId: "650265423360"
};
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

//Add Login Event
btnLogin.addEventListener('click', e => {
    //Get email and pass

    const name = txtName.value;
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
                }
            });
        }

        var user = firebase.auth().currentUser;
        //console.log(document.getElementById('txtUpdateEmail').value);
        user.updateProfile({ 
            displayName: name,
             photoURL: "/images/TestEgg101.png"
        }).then(function() {  // Update successful.
        }).catch(function(error) {  // An error happened.
        });

        user.updateEmail(email).then(function() {  // Update successful.
        }).catch(function(error) {  // An error happened.
        });
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
    }
});

//egg collection function
/*firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        const recentEgg = document.getElementById('recentEgg')

        //const e1 = document.getElementById('e1')
        const dbUserRef = firebase.database().ref();
        const dbEggRef = dbUserRef.child('users').child(firebaseUser.uid).child('recentEggs');

        //const notCollected = 0;
        //const collected = 0;

        dbEggRef.on('value', function(snap) {
            console.log(snap.val().RE1.eggNum);
            if (snap.val().RE1.eggNum == '0') {
                const section = document.createElement('section');
                section.classList.add('recentEggItem');
                recentEgg.appendChild(section);

                const h1 = document.createElement('h1');
                h1.innerText = 'Egg ' + snap.val().RE1.eggNum;
                section.appendChild(h1);

                const img = document.createElement('img');
                const linkText = document.createTextNode('egg' + snap.val().RE1.eggNum);
                img.appendChild(linkText);
                img.classList.add('eggImage');
                img.title = 'egg' + snap.val().RE1.eggNum;
                img.id = 'egg' + snap.val().RE1.eggNum;

                ////until more images are added this is here so that if any eggs that are listed as greater or less than 101 to 103 have an image
                ////when new images are added all you will need to do is save an image with the number of the egg and a string value that is static and it will pick it up.
                //img.src = 'images/TestEgg' + snap.val().eggNum + '.png';
                if (snap.val().RE1.eggNum <= 100 || snap.val().RE1.eggNum >= 104) {
                    img.src = 'images/TestEgg102.png';
                } else {
                    img.src = 'images/TestEgg' + snap.val().RE1.eggNum + '.png';
                }
                ////similarly to the image if the name of a website contains the egg value then it should be able to be pulled up this way.
                //img.href = 'https://haakonj.github.io/Prototype-Firebase-App/egg' + snap.val().eggNum + '.html'

                section.appendChild(img);
                // console.log(recentCount + snap.val().timeStamp);
                //collected++;
            }
            console.log(snap.val().RE2.eggNum);
            if (snap.val().RE2.eggNum == '0') {
                const section = document.createElement('section');
                section.classList.add('recentEggItem');
                recentEgg.appendChild(section);

                const h1 = document.createElement('h1');
                h1.innerText = 'Egg ' + snap.val().RE2.eggNum;
                section.appendChild(h1);

                const img = document.createElement('img');
                const linkText = document.createTextNode('egg' + snap.val().RE2.eggNum);
                img.appendChild(linkText);
                img.classList.add('eggImage');
                img.title = 'egg' + snap.val().RE2.eggNum;
                img.id = 'egg' + snap.val().RE2.eggNum;

                ////until more images are added this is here so that if any eggs that are listed as greater or less than 101 to 103 have an image
                ////when new images are added all you will need to do is save an image with the number of the egg and a string value that is static and it will pick it up.
                //img.src = 'images/TestEgg' + snap.val().eggNum + '.png';
                if (snap.val().RE2.eggNum <= 100 || snap.val().RE2.eggNum >= 104) {
                    img.src = 'images/TestEgg102.png';
                } else {
                    img.src = 'images/TestEgg' + snap.val().RE2.eggNum + '.png';
                }
                ////similarly to the image if the name of a website contains the egg value then it should be able to be pulled up this way.
                //img.href = 'https://haakonj.github.io/Prototype-Firebase-App/egg' + snap.val().eggNum + '.html'

                section.appendChild(img);
                // console.log(recentCount + snap.val().timeStamp);
                //collected++;
            }
            console.log(snap.val().RE3.eggNum);
            if (snap.val().RE3.eggNum == '0') {
                const section = document.createElement('section');
                section.classList.add('recentEggItem');
                recentEgg.appendChild(section);

                const h1 = document.createElement('h1');
                h1.innerText = 'Egg ' + snap.val().RE3.eggNum;
                section.appendChild(h1);

                const img = document.createElement('img');
                const linkText = document.createTextNode('egg' + snap.val().RE3.eggNum);
                img.appendChild(linkText);
                img.classList.add('eggImage');
                img.title = 'egg' + snap.val().RE3.eggNum;
                img.id = 'egg' + snap.val().RE3.eggNum;

                ////until more images are added this is here so that if any eggs that are listed as greater or less than 101 to 103 have an image
                ////when new images are added all you will need to do is save an image with the number of the egg and a string value that is static and it will pick it up.
                //img.src = 'images/TestEgg' + snap.val().eggNum + '.png';
                if (snap.val().RE3.eggNum <= 100 || snap.val().RE3.eggNum >= 104) {
                    img.src = 'images/TestEgg102.png';
                } else {
                    img.src = 'images/TestEgg' + snap.val().RE3.eggNum + '.png';
                }
                ////similarly to the image if the name of a website contains the egg value then it should be able to be pulled up this way.
                //img.href = 'https://haakonj.github.io/Prototype-Firebase-App/egg' + snap.val().eggNum + '.html'

                section.appendChild(img);
                // console.log(recentCount + snap.val().timeStamp);
                //collected++;
            }
            console.log(snap.val().RE4.eggNum);
            if (snap.val().RE4.eggNum == '0') {
                const section = document.createElement('section');
                section.classList.add('recentEggItem');
                recentEgg.appendChild(section);

                const h1 = document.createElement('h1');
                h1.innerText = 'Egg ' + snap.val().RE4.eggNum;
                section.appendChild(h1);

                const img = document.createElement('img');
                const linkText = document.createTextNode('egg' + snap.val().RE4.eggNum);
                img.appendChild(linkText);
                img.classList.add('eggImage');
                img.title = 'egg' + snap.val().RE4.eggNum;
                img.id = 'egg' + snap.val().RE4.eggNum;

                ////until more images are added this is here so that if any eggs that are listed as greater or less than 101 to 103 have an image
                ////when new images are added all you will need to do is save an image with the number of the egg and a string value that is static and it will pick it up.
                //img.src = 'images/TestEgg' + snap.val().eggNum + '.png';
                if (snap.val().RE4.eggNum <= 100 || snap.val().RE4.eggNum >= 104) {
                    img.src = 'images/TestEgg102.png';
                } else {
                    img.src = 'images/TestEgg' + snap.val().RE4.eggNum + '.png';
                }
                ////similarly to the image if the name of a website contains the egg value then it should be able to be pulled up this way.
                //img.href = 'https://haakonj.github.io/Prototype-Firebase-App/egg' + snap.val().eggNum + '.html'

                section.appendChild(img);
                // console.log(recentCount + snap.val().timeStamp);
                //collected++;
            }
            console.log(snap.val().RE5.eggNum);
            if (snap.val().RE5.eggNum == '0') {
                const section = document.createElement('section');
                section.classList.add('recentEggItem');
                recentEgg.appendChild(section);

                const h1 = document.createElement('h1');
                h1.innerText = 'Egg ' + snap.val().RE5.eggNum;
                section.appendChild(h1);

                const img = document.createElement('img');
                const linkText = document.createTextNode('egg' + snap.val().RE5.eggNum);
                img.appendChild(linkText);
                img.classList.add('eggImage');
                img.title = 'egg' + snap.val().RE5.eggNum;
                img.id = 'egg' + snap.val().RE5.eggNum;

                ////until more images are added this is here so that if any eggs that are listed as greater or less than 101 to 103 have an image
                ////when new images are added all you will need to do is save an image with the number of the egg and a string value that is static and it will pick it up.
                //img.src = 'images/TestEgg' + snap.val().eggNum + '.png';
                if (snap.val().RE5.eggNum <= 100 || snap.val().RE5.eggNum >= 104) {
                    img.src = 'images/TestEgg102.png';
                } else {
                    img.src = 'images/TestEgg' + snap.val().RE5.eggNum + '.png';
                }
                ////similarly to the image if the name of a website contains the egg value then it should be able to be pulled up this way.
                //img.href = 'https://haakonj.github.io/Prototype-Firebase-App/egg' + snap.val().eggNum + '.html'

                section.appendChild(img);
                // console.log(recentCount + snap.val().timeStamp);
                //collected++;
            }
        });
    }

});*/

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        var user = firebase.auth().currentUser;
        var name, email, uid;

        if (user != null) { 
            dname = user.displayName; 
            demail = user.email; 
            dphotoUrl = user.photoURL; 
            demailVerified = user.emailVerified; 
            duid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.

            console.log("name: " + dname);
            console.log("email: " + demail);
            console.log("photoUrl: " + dphotoUrl);
            console.log("emailVerified: " + demailVerified);
            console.log("uid: " + duid);
        }
    };
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        const dbUserRef = firebase.database().ref();
        const userNameTxt = document.getElementById('userNameTxt');
        const dbUserName = dbUserRef.child('users').child(firebaseUser.uid).child('UserName');

        var user = firebase.auth().currentUser;
        var name, email, uid;

        if (user != null) { 
            dname = user.displayName; 
            userNameTxt.innerText = dname;
        }

        //dbUserName.on('value', snap => {

        //userNameTxt.innerText = snap.val();
        //console.log('thing ' + snap.val());
        //})
    }
});

//progress egg function
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        const recentEgg = document.getElementById('recentEgg');

        //const e1 = document.getElementById('e1')
        const dbUserRef = firebase.database().ref();
        const dbEggRef = dbUserRef.child('users').child(firebaseUser.uid).child('eui').child('eui');

        var notCollected = 0;
        var collected = 0;

        //var recentCount = 0;

        dbEggRef.on('value', function(snap) {
            for (var i = 0; i < snap.val().length; i++) {
                if (snap.val().charAt(i) == 1) {
                    collected++;
                } else {
                    notCollected++;
                    collected++;
                }
            }
            var pecentCollect;
            var collectedegg = notCollected / collected;
            pecentCollect = Math.round(collectedegg * 100);
            var percentNotCollected = 100 - pecentCollect;

            const progressEgg = document.getElementById('progressEgg');
            const eggProgressTxt = document.getElementById('eggProgressTxt');

            progressEgg.setAttribute("style", "clip:rect(" + pecentCollect * 3 + "px, 200px, 300px, 0px)");
            eggProgressTxt.innerText = percentNotCollected + ' %';
        });
    }
});

const btnAccountName = document.getElementById('btnAccountName');
btnAccountName.addEventListener('click', e => {
    var user = firebase.auth().currentUser;
    //console.log(document.getElementById('txtUpdateName').value);
    if (document.getElementById('txtUpdateName').value != null) {
        document.getElementById('AccName').innerText = document.getElementById('txtUpdateName').value;
        user.updateProfile({
            displayName: document.getElementById('txtUpdateName').value
        }).then(function() {
            console.log(user.displayName);
        }).catch(function(error) {});
    }
});

const btnAccountImage = document.getElementById('btnAccountImage');
btnAccountImage.addEventListener('click', e => {
    var user = firebase.auth().currentUser;
    //console.log(document.getElementById('txtUpdateEmail').value);
    if (document.getElementById('updateImage').value != null) {
        document.getElementById('AccImage').src = document.getElementById('updateImage');

        var thingy = document.getElementById('updateImage').value;
        console.log(thingy);
        console.log(document.getElementById('AccImage').src);
        //user.updateProfile({
        //displayName: document.getElementById('txtUpdateEmail').value
        //}).then(function() {
        // console.log(user.email);
        //}).catch(function(error) {
        //});
    }
});

const btnAccountEmail = document.getElementById('btnAccountEmail');
btnAccountEmail.addEventListener('click', e => {
    var user = firebase.auth().currentUser;
    //console.log(document.getElementById('txtUpdateEmail').value);
    if (document.getElementById('txtUpdateEmail').value != null) {
        document.getElementById('AccEmail').innerText = document.getElementById('txtUpdateEmail').value;
        user.updateEmail(document.getElementById('txtUpdateEmail').value).then(function() {  // Update successful.
        }).catch(function(error) {  // An error happened.
        });
    }
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        const btnDeleteAccount = document.getElementById('btnDeleteAccount');
        btnDeleteAccount.addEventListener('click', e => {
            console.log("deleting info");
            const dbUser = firebase.database().ref().child('users').child(firebaseUser.uid);

            dbUser.set({});

            console.log("deleting account");
            var user = firebase.auth().currentUser;
            user.delete().then(function() {
                location.reload();
            }).catch(function(error) {

            });
            console.log("deleted");
        });
    }
});

const btnAccountCard = document.getElementById('btnAccountCard');
btnAccountCard.addEventListener('click', e => {
    AccountInfoCard.classList.remove('hide');
});

const btnDeleteCard = document.getElementById('btnDeleteCard');
btnDeleteCard.addEventListener('click', e => {
    DeleteAccountCard.classList.remove('hide');
});

const btnHide1 = document.getElementById('btnHide1');
btnHide1.addEventListener('click', e => {
    AccountInfoCard.classList.add('hide');
});

const btnHide2 = document.getElementById('btnHide2');
btnHide2.addEventListener('click', e => {
    DeleteAccountCard.classList.add('hide');
});