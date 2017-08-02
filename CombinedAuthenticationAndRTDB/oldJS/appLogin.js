(function() {

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
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
	//Sign in
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
	});
	
	//
	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	});
	
	//Add a realtime Listner
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			console.log(firebaseUser);
			btnLogout.classList.remove('hide');
		}else{
			console.log('not Logged in');
			btnLogout.classList.add('hide');
		}
	});
}());