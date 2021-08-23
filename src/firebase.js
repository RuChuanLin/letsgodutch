import * as firebase from "firebase";
import "firebase/database";

const config = {
};

firebase.initializeApp(config);

export default firebase.database();
