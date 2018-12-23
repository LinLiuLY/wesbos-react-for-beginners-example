import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBlpYlsTk161qySoOGXUTzcL7X6tguiT14',
  authDomain: 'catch-of-the-day-bfec4.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-bfec4.firebaseio.com'
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;
