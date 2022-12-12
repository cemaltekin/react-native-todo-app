import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB7hGrds07gF6jgNWwfuoSLdAfwn_ruWDE",
    authDomain: "todo-app-68557.firebaseapp.com",
    databaseURL: "https://todo-app-68557-default-rtdb.firebaseio.com",
    projectId: "todo-app-68557",
    storageBucket: "todo-app-68557.appspot.com",
    messagingSenderId: "204413512265",
    appId: "1:204413512265:web:bb06654d34f76ed150ed98",
    measurementId: "G-EJF8QSZXC6"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase };  