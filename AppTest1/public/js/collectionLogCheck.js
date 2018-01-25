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

//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        fireLoading.classList.remove('hide');

    } else {
        fireLoading.classList.add('hide');
    }
});