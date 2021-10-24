import firebase from "firebase";
import Localbase from "localbase";
import "firebase/database";
// import configs from "./configs";

const urlSearchParams = new URLSearchParams(window.location.search);
const configs = Object.fromEntries(urlSearchParams.entries());

let usingLocalDB = false;
let db = null;
if (configs.apiKey && configs.authDomain && configs.projectId) {
  try {
    firebase.initializeApp(configs);
    db = firebase.firestore();
  } catch (e) {
    db = new Localbase("db");
  }
} else {
  usingLocalDB = true;
  db = new Localbase("db");
}

export { usingLocalDB };
export default db;
