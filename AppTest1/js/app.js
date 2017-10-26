src = "https://www.gstatic.com/firebasejs/4.5.0/firebase.js" 
    // Initialize Firebase
var config = {   apiKey: "AIzaSyCnyv5HubWOmjjO1-5SwnduU0H_R_R4kd0",   authDomain: "egg-collection-database.firebaseapp.com",   databaseURL: "https://egg-collection-database.firebaseio.com",   projectId: "egg-collection-database",   storageBucket: "egg-collection-database.appspot.com",   messagingSenderId: "56187974224"  }; 
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