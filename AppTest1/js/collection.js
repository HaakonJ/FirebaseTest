src = "https://www.gstatic.com/firebasejs/4.5.0/firebase.js"

  // Initialize Firebase
 
// Initialize Firebase
 
var config = {   apiKey: "AIzaSyCnyv5HubWOmjjO1-5SwnduU0H_R_R4kd0",   authDomain: "egg-collection-database.firebaseapp.com",   databaseURL: "https://egg-collection-database.firebaseio.com",   projectId: "egg-collection-database",   storageBucket: "egg-collection-database.appspot.com",   messagingSenderId: "56187974224"  }; 
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
        });
    }

});


function openCard(cardNumber) {
    switch (cardNumber) {
        case 1:
            eggCard1.classList.remove('hide');
            document.getElementById('btnHide1').addEventListener('click', e => {
                eggCard1.classList.add('hide');
            });
            break;

        case 2:
            eggCard2.classList.remove('hide');
            document.getElementById('btnHide2').addEventListener('click', e => {
                eggCard2.classList.add('hide');
            });
            break;

        case 3:
            eggCard3.classList.remove('hide');
            document.getElementById('btnHide3').addEventListener('click', e => {
                eggCard3.classList.add('hide');
            });
            break;

        case 4:
            eggCard4.classList.remove('hide');
            document.getElementById('btnHide4').addEventListener('click', e => {
                eggCard4.classList.add('hide');
            });
            break;

        case 5:
            eggCard5.classList.remove('hide');
            document.getElementById('btnHide5').addEventListener('click', e => {
                eggCard5.classList.add('hide');
            });
            break;

        case 6:
            eggCard6.classList.remove('hide');
            document.getElementById('btnHide6').addEventListener('click', e => {
                eggCard6.classList.add('hide');
            });
            break;

        case 7:
            eggCard7.classList.remove('hide');
            document.getElementById('btnHide7').addEventListener('click', e => {
                eggCard7.classList.add('hide');
            });
            break;

        case 8:
            eggCard8.classList.remove('hide');
            document.getElementById('btnHide8').addEventListener('click', e => {
                eggCard8.classList.add('hide');
            });
            break;

        case 9:
            eggCard9.classList.remove('hide');
            document.getElementById('btnHide9').addEventListener('click', e => {
                eggCard9.classList.add('hide');
            });
            break;

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

        case 20:
            eggCard20.classList.remove('hide');
            document.getElementById('btnHide20').addEventListener('click', e => {
                eggCard20.classList.add('hide');
            });
            break;

        case 21:
            eggCard21.classList.remove('hide');
            document.getElementById('btnHide21').addEventListener('click', e => {
                eggCard21.classList.add('hide');
            });
            break;

        case 22:
            eggCard22.classList.remove('hide');
            document.getElementById('btnHide22').addEventListener('click', e => {
                eggCard22.classList.add('hide');
            });
            break;

        case 23:
            eggCard23.classList.remove('hide');
            document.getElementById('btnHide23').addEventListener('click', e => {
                eggCard23.classList.add('hide');
            });
            break;

        case 24:
            eggCard24.classList.remove('hide');
            document.getElementById('btnHide24').addEventListener('click', e => {
                eggCard24.classList.add('hide');
            });
            break;

        case 25:
            eggCard25.classList.remove('hide');
            document.getElementById('btnHide25').addEventListener('click', e => {
                eggCard25.classList.add('hide');
            });
            break;

        case 26:
            eggCard26.classList.remove('hide');
            document.getElementById('btnHide26').addEventListener('click', e => {
                eggCard26.classList.add('hide');
            });
            break;

        case 27:
            eggCard27.classList.remove('hide');
            document.getElementById('btnHide27').addEventListener('click', e => {
                eggCard27.classList.add('hide');
            });
            break;

        case 28:
            eggCard28.classList.remove('hide');
            document.getElementById('btnHide28').addEventListener('click', e => {
                eggCard28.classList.add('hide');
            });
            break;

        case 29:
            eggCard29.classList.remove('hide');
            document.getElementById('btnHide29').addEventListener('click', e => {
                eggCard29.classList.add('hide');
            });
            break;

        case 30:
            eggCard30.classList.remove('hide');
            document.getElementById('btnHide30').addEventListener('click', e => {
                eggCard30.classList.add('hide');
            });
            break;

        case 31:
            eggCard31.classList.remove('hide');
            document.getElementById('btnHide31').addEventListener('click', e => {
                eggCard31.classList.add('hide');
            });
            break;

        case 32:
            eggCard32.classList.remove('hide');
            document.getElementById('btnHide32').addEventListener('click', e => {
                eggCard32.classList.add('hide');
            });
            break;

        case 33:
            eggCard33.classList.remove('hide');
            document.getElementById('btnHide33').addEventListener('click', e => {
                eggCard33.classList.add('hide');
            });
            break;

        case 34:
            eggCard34.classList.remove('hide');
            document.getElementById('btnHide34').addEventListener('click', e => {
                eggCard34.classList.add('hide');
            });
            break;

        case 35:
            eggCard35.classList.remove('hide');
            document.getElementById('btnHide35').addEventListener('click', e => {
                eggCard35.classList.add('hide');
            });
            break;

        case 36:
            eggCard36.classList.remove('hide');
            document.getElementById('btnHide36').addEventListener('click', e => {
                eggCard36.classList.add('hide');
            });
            break;

        case 37:
            eggCard37.classList.remove('hide');
            document.getElementById('btnHide37').addEventListener('click', e => {
                eggCard37.classList.add('hide');
            });
            break;

        case 38:
            eggCard38.classList.remove('hide');
            document.getElementById('btnHide38').addEventListener('click', e => {
                eggCard38.classList.add('hide');
            });
            break;

        case 39:
            eggCard39.classList.remove('hide');
            document.getElementById('btnHide39').addEventListener('click', e => {
                eggCard39.classList.add('hide');
            });
            break;

        case 40:
            eggCard40.classList.remove('hide');
            document.getElementById('btnHide40').addEventListener('click', e => {
                eggCard40.classList.add('hide');
            });
            break;

        case 41:
            eggCard41.classList.remove('hide');
            document.getElementById('btnHide41').addEventListener('click', e => {
                eggCard41.classList.add('hide');
            });
            break;

        case 42:
            eggCard42.classList.remove('hide');
            document.getElementById('btnHide42').addEventListener('click', e => {
                eggCard42.classList.add('hide');
            });
            break;

        case 43:
            eggCard43.classList.remove('hide');
            document.getElementById('btnHide43').addEventListener('click', e => {
                eggCard43.classList.add('hide');
            });
            break;

        case 44:
            eggCard44.classList.remove('hide');
            document.getElementById('btnHide44').addEventListener('click', e => {
                eggCard44.classList.add('hide');
            });
            break;

        case 45:
            eggCard45.classList.remove('hide');
            document.getElementById('btnHide45').addEventListener('click', e => {
                eggCard45.classList.add('hide');
            });
            break;

        case 46:
            eggCard46.classList.remove('hide');
            document.getElementById('btnHide46').addEventListener('click', e => {
                eggCard46.classList.add('hide');
            });
            break;

        case 47:
            eggCard47.classList.remove('hide');
            document.getElementById('btnHide47').addEventListener('click', e => {
                eggCard47.classList.add('hide');
            });
            break;

        case 48:
            eggCard48.classList.remove('hide');
            document.getElementById('btnHide48').addEventListener('click', e => {
                eggCard48.classList.add('hide');
            });
            break;

        case 49:
            eggCard49.classList.remove('hide');
            document.getElementById('btnHide49').addEventListener('click', e => {
                eggCard49.classList.add('hide');
            });
            break;

        case 50:
            eggCard50.classList.remove('hide');
            document.getElementById('btnHide50').addEventListener('click', e => {
                eggCard50.classList.add('hide');
            });
            break;

        case 51:
            eggCard51.classList.remove('hide');
            document.getElementById('btnHide51').addEventListener('click', e => {
                eggCard51.classList.add('hide');
            });
            break;

        case 52:
            eggCard52.classList.remove('hide');
            document.getElementById('btnHide52').addEventListener('click', e => {
                eggCard52.classList.add('hide');
            });
            break;

        case 53:
            eggCard53.classList.remove('hide');
            document.getElementById('btnHide53').addEventListener('click', e => {
                eggCard53.classList.add('hide');
            });
            break;

        case 54:
            eggCard54.classList.remove('hide');
            document.getElementById('btnHide54').addEventListener('click', e => {
                eggCard54.classList.add('hide');
            });
            break;

        case 55:
            eggCard55.classList.remove('hide');
            document.getElementById('btnHide55').addEventListener('click', e => {
                eggCard55.classList.add('hide');
            });
            break;

        case 56:
            eggCard56.classList.remove('hide');
            document.getElementById('btnHide56').addEventListener('click', e => {
                eggCard56.classList.add('hide');
            });
            break;

        case 58:
            document.getElementsByClassName('eggCard').classList.add('hide');
            eggCard58.classList.remove('hide');
            document.getElementById('btnHide58').addEventListener('click', e => {
                eggCard58.classList.add('hide');
            });
            break;
    }
}