import Firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD3WtQ35u9JXIuL_3iZ7W2HivFkGQBXRd4",
    authDomain: "mindbrowser-f7523.firebaseapp.com",
    databaseURL: "https://mindbrowser-f7523-default-rtdb.firebaseio.com",
    projectId: "mindbrowser-f7523",
    storageBucket: "mindbrowser-f7523.appspot.com",
    messagingSenderId: "471876870511",
    appId: "1:471876870511:android:581dd5ce7656147846c89a",
    measurementId: "G-HE2R5PLB71"
  };

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();