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

//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        fireLoading.classList.add('hide');
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
                eui: { eui: "000000000000000000000000000000" }
            });
        }
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