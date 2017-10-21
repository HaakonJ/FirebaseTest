src = "https://www.gstatic.com/firebasejs/4.5.0/firebase.js"

  // Initialize Firebase
 
var config = {   apiKey: "AIzaSyC42UIRETC_VVO7cXGqo9ru8TlfDi_-El8",   authDomain: "test-project-4d8c5.firebaseapp.com",   databaseURL: "https://test-project-4d8c5.firebaseio.com",   projectId: "test-project-4d8c5",   storageBucket: "test-project-4d8c5.appspot.com",   messagingSenderId: "591336136232"  }; 
firebase.initializeApp(config);


//Get elements
const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtLogin = document.getElementById('btnLogin');
const txtSignUp = document.getElementById('btnSignUp');
const txtLogout = document.getElementById('btnLogout');
const LoginMessage = document.getElementById('LoginMessage')

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
                timeStamp: new Date().toString(),
                eui: {
                    e1ui: { bool: false, eggNum: 1 },
                    e2ui: { bool: false, eggNum: 2 },
                    e3ui: { bool: false, eggNum: 3 },
                    e4ui: { bool: false, eggNum: 4 },
                    e5ui: { bool: false, eggNum: 5 },
                    e6ui: { bool: false, eggNum: 6 },
                    e7ui: { bool: false, eggNum: 7 },
                    e8ui: { bool: false, eggNum: 8 },
                    e9ui: { bool: false, eggNum: 9 },
                    e10ui: { bool: false, eggNum: 10 },
                    e11ui: { bool: false, eggNum: 11 },
                    e12ui: { bool: false, eggNum: 12 },
                    e13ui: { bool: false, eggNum: 13 },
                    e14ui: { bool: false, eggNum: 14 },
                    e15ui: { bool: false, eggNum: 15 },
                    e16ui: { bool: false, eggNum: 16 },
                    e17ui: { bool: false, eggNum: 17 },
                    e18ui: { bool: false, eggNum: 18 },
                    e19ui: { bool: false, eggNum: 19 },
                    e20ui: { bool: false, eggNum: 20 },
                    e21ui: { bool: false, eggNum: 21 },
                    e22ui: { bool: false, eggNum: 22 },
                    e23ui: { bool: false, eggNum: 23 },
                    e24ui: { bool: false, eggNum: 24 },
                    e25ui: { bool: false, eggNum: 25 },
                    e26ui: { bool: false, eggNum: 26 },
                    e27ui: { bool: false, eggNum: 27 },
                    e28ui: { bool: false, eggNum: 28 },
                    e29ui: { bool: false, eggNum: 29 },
                    e30ui: { bool: false, eggNum: 30 },
                    e31ui: { bool: false, eggNum: 31 },
                    e32ui: { bool: false, eggNum: 32 },
                    e33ui: { bool: false, eggNum: 33 },
                    e34ui: { bool: false, eggNum: 34 },
                    e35ui: { bool: false, eggNum: 35 },
                    e36ui: { bool: false, eggNum: 36 },
                    e37ui: { bool: false, eggNum: 37 },
                    e38ui: { bool: false, eggNum: 38 },
                    e39ui: { bool: false, eggNum: 39 },
                    e40ui: { bool: false, eggNum: 40 },
                    e41ui: { bool: false, eggNum: 41 },
                    e42ui: { bool: false, eggNum: 42 },
                    e43ui: { bool: false, eggNum: 43 },
                    e44ui: { bool: false, eggNum: 44 },
                    e45ui: { bool: false, eggNum: 45 },
                    e46ui: { bool: false, eggNum: 46 },
                    e47ui: { bool: false, eggNum: 47 },
                    e48ui: { bool: false, eggNum: 48 },
                    e49ui: { bool: false, eggNum: 49 },
                    e50ui: { bool: false, eggNum: 50 },
                    e101ui: { bool: false, eggNum: 101 },
                    e102ui: { bool: false, eggNum: 102 }
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
    } else {
        console.log('not Logged in');
        LoginMessage.classList.remove('hide');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignUp.classList.remove('hide');
    }
});