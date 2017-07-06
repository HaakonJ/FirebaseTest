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
    const preObject = document.getElementById('object');
    const ulList = document.getElementById('list');

    // Create reference
    const dbRefObject = firebase.database().ref().child('object');
    const dbRefList = dbRefObject.child('hobbies');

    // Sync Object Changes
    dbRefObject.on('value', snap => {
        preObject.innerHTML = JSON.stringify(snap.val(), null, 3);
    });

    // Sync List Changes
    dbRefList.on('child_added', snap => {

        const li = document.createElement('li');
        li.innerText = snap.val();
        li.id = snap.key;
        ulList.appendChild(li);
    });

    dbRefList.on('child_changed', snap => {

        const liChanged = document.getElementById(snap.key);
        liChanged.innerText = snap.val();

    });

    dbRefList.on('child_removed', snap => {

        const liToRemove = document.getElementById(snap.key);
        liToRemove.remove();

    });

}());