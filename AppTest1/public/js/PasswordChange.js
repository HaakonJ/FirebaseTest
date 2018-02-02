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
const fireLoading = document.getElementById('fireLoading');
const homeBackground = document.getElementById('homeBackground');
const LMContainer = document.getElementById('LMContainer');
const msgbtnLogin = document.getElementById('msgbtnLogin');
const msgbtnSignUp = document.getElementById('msgbtnSignUp');
const msgbtnLogout = document.getElementById('msgbtnLogout');

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
                eui: { eui: "000000000000000000000000000000" }
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

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        const dbUserRef = firebase.database().ref();
        const frmUserNameTxt = document.getElementById('frmUserNameTxt');
        const dbUserName = dbUserRef.child('users').child(firebaseUser.uid).child('UserName');

        var user = firebase.auth().currentUser;
        var name;

        if (user != null) { 
            dname = user.displayName; 
            frmUserNameTxt.innerText = 'Hi, ' + dname;
        }
    }
});

//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        fireLoading.classList.add('hide');
        LMContainer.classList.add('LMContainer');
        LMContainer.classList.remove('hide');
        //homeContainer.classList.remove('hide');
        homeBackground.classList.remove('hide');
        homeBackground.classList.add('background');
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignUp.classList.add('hide');
        frmName.classList.add('hide');
        frmEmail.classList.add('hide');
        frmPassword.classList.add('hide');
        frmUserName.classList.remove('hide');
    } else {
        console.log('not Logged in');
        fireLoading.classList.add('hide');
        LMContainer.classList.add('LMContainer');
        LMContainer.classList.remove('hide');
        homeBackground.classList.remove('hide');
        homeBackground.classList.add('background');
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

/*
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
});*/

const msgbtnCP = document.getElementById('msgbtnCP');
msgbtnCP.addEventListener('click', e => {
    var auth = firebase.auth();
    const msgtxtEmail = document.getElementById('msgtxtEmail');
    var emailAddress = msgtxtEmail.value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        console.debug("Email Sent!");
    }).catch(function(error) {
        // An error happened.
        console.debug("Error!!! Password Change Email Not Sent!?!");
    });

});