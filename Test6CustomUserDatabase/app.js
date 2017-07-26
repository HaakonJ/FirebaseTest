// Initialize Firebase
var config = {
    apiKey: "AIzaSyC42UIRETC_VVO7cXGqo9ru8TlfDi_-El8",
    authDomain: "test-project-4d8c5.firebaseapp.com",
    databaseURL: "https://test-project-4d8c5.firebaseio.com",
    projectId: "test-project-4d8c5",
    storageBucket: "test-project-4d8c5.appspot.com",
    messagingSenderId: "591336136232"
};
firebase.initializeApp(config);

//Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtLogin = document.getElementById('btnLogin');
const txtSignUp = document.getElementById('btnSignUp');
const txtLogout = document.getElementById('btnLogout');

const map2 = document.getElementById('map2');
const LocateButton = document.getElementById('LocateButton');
const LoginMessage = document.getElementById('LoginMessage');



//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignUp.classList.add('hide');
        map2.classList.remove('hide');
        LocateButton.classList.remove('hide');
        LoginMessage.classList.add('hide');
    } else {
        console.log('not Logged in');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignUp.classList.remove('hide');
        map2.classList.add('hide');
        LocateButton.classList.add('hide');
        LoginMessage.classList.remove('hide');
    }
});

var user = firebase.auth().currentUser;
const name2 = document.getElementById('name');
const email2 = document.getElementById('email');
const uid2 = document.getElementById('uid');
const dbRefObject = firebase.database().ref();

var user = firebase.auth().currentUser;

if (user != null) { 
    name = user.displayName; 
    email = user.email;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
               // this value to authenticate with your backend server, if
               // you have one. Use User.getToken() instead.
}

if (user != null) { 
    user.providerData.forEach(function(profile) {  
        console.log("Sign-in provider: " + profile.providerId);  
        console.log("  Provider-specific UID: " + profile.uid);  
        console.log("  Name: " + profile.displayName);  
        console.log("  Email: " + profile.email);  
    });
}