import firebase from "firebase";
import "firebase/database";
import configs from "./configs";

firebase.initializeApp(configs);

export default firebase.firestore();
