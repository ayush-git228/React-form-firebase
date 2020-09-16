import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAI_w1-b90UgUPTQ0VcytLB5-1uLVmRcX0",
    authDomain: "form-a545c.firebaseapp.com",
    databaseURL: "https://form-a545c.firebaseio.com",  
    projectId: "form-a545c",
    storageBucket: "form-a545c.appspot.com",
    messagingSenderId: "487714151799",
    appId: "1:487714151799:web:9ce63b85297add9626d572",
    measurementId: "G-LJT9BWPCB4"
  
};

const Firebase = firebase.initializeApp(config);
export default Firebase;
