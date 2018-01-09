src = "https://www.gstatic.com/firebasejs/4.6.2/firebase.js"
    // Initialize Firebase
var config = {
    apiKey: "AIzaSyCnyv5HubWOmjjO1-5SwnduU0H_R_R4kd0",
    authDomain: "egg-collection-database.firebaseapp.com",
    databaseURL: "https://egg-collection-database.firebaseio.com",
    projectId: "egg-collection-database",
    storageBucket: "egg-collection-database.appspot.com",
    messagingSenderId: "56187974224"
};
firebase.initializeApp(config);


// Create reference
const dbRefObject = firebase.database().ref();
const dbRefList = dbRefObject.child('stuff');

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
                eui: "00000000000000000000000000000000000000000000000000",
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
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        //const collection = document.getElementById('collection')

        //const e1 = document.getElementById('e1')
        const dbUserRef = firebase.database().ref();
        const dbEggRef = dbUserRef.child('users').child(firebaseUser.uid).child('eui').child('eui');

        //const notCollected = 0;
        //const collected = 0;

        dbEggRef.on('value', function(snap) {
            for (var i = 0; i < snap.val().length; i++) {
                if (i >= 9 && i <= 18) {
                    var sectNum = document.getElementById('sect' + (i + 1));

                    //const section = document.createElement('section');
                    //section.classList.add('eggItem');
                    //collection.appendChild(section);

                    const h1 = document.getElementById('eggH' + (i + 1));
                    h1.innerText = 'Egg ' + (i + 1);

                    const img = document.createElement('img');
                    const linkText = document.createTextNode('egg' + (i + 1));
                    img.appendChild(linkText);
                    img.classList.add('eggImage');
                    img.title = 'egg' + (i + 1);
                    img.id = 'egg' + (i + 1);

                    if (snap.val().charAt(i) == "1") {
                        ////until more images are added this is here so that if any eggs that are listed as greater or less than 101 to 103 have an image
                        ////when new images are added all you will need to do is save an image with the number of the egg and a string value that is static and it will pick it up.
                        //img.src = 'images/TestEgg' + snap.val().eggNum + '.png';
                        if ((i + 1) <= 51 || (i + 1) >= 54) {
                            img.src = 'images/TestEgg102.png';
                            document.getElementById('eggCardImg' + (i + 1)).src = 'images/TestEgg102.png';
                        } else {
                            img.src = 'images/TestEgg' + 101 + '.png';
                            document.getElementById('eggCardImg' + (i + 1)).src = 'images/TestEgg' + 101 + '.png';
                        }
                        ////similarly to the image if the name of a website contains the egg value then it should be able to be pulled up this way.
                        //img.href = 'https://haakonj.github.io/Prototype-Firebase-App/egg' + snap.val().eggNum + '.html'

                        document.getElementById('div' + (i + 1)).appendChild(img)
                            //collected++;
                    } else {

                        document.getElementById('div' + (i + 1)).classList.add('hide');

                        img.src = 'images/NewMysteryEgg.png';

                        document.getElementById('sect' + (i + 1)).appendChild(img);
                        //notCollected++;
                        //collected++;
                    }
                }
            }
        });
    }

});


function openCard(cardNumber) {
    switch (cardNumber) {
        case 10:
            eggCard10.classList.remove('hide');
            document.getElementById('btnHide10').addEventListener('click', e => {
                eggCard10.classList.add('hide');
            });
            break;

        case 11:
            eggCard11.classList.remove('hide');
            document.getElementById('btnHide11').addEventListener('click', e => {
                eggCard11.classList.add('hide');
            });
            break;

        case 12:
            eggCard12.classList.remove('hide');
            document.getElementById('btnHide12').addEventListener('click', e => {
                eggCard12.classList.add('hide');
            });
            break;

        case 13:
            eggCard13.classList.remove('hide');
            document.getElementById('btnHide13').addEventListener('click', e => {
                eggCard13.classList.add('hide');
            });
            break;

        case 14:
            eggCard14.classList.remove('hide');
            document.getElementById('btnHide14').addEventListener('click', e => {
                eggCard14.classList.add('hide');
            });
            break;

        case 15:
            eggCard15.classList.remove('hide');
            document.getElementById('btnHide15').addEventListener('click', e => {
                eggCard15.classList.add('hide');
            });
            break;

        case 16:
            eggCard16.classList.remove('hide');
            document.getElementById('btnHide16').addEventListener('click', e => {
                eggCard16.classList.add('hide');
            });
            break;

        case 17:
            eggCard17.classList.remove('hide');
            document.getElementById('btnHide17').addEventListener('click', e => {
                eggCard17.classList.add('hide');
            });
            break;

        case 18:
            eggCard18.classList.remove('hide');
            document.getElementById('btnHide18').addEventListener('click', e => {
                eggCard18.classList.add('hide');
            });
            break;

        case 19:
            eggCard19.classList.remove('hide');
            document.getElementById('btnHide19').addEventListener('click', e => {
                eggCard19.classList.add('hide');
            });
            break;
    }
}