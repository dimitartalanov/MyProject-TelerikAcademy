import router from 'router';
import firebaseDb from 'firebaseDb';
import firebaseModule from 'firebase-config';
import userState from 'user-state';
import resize from 'toggle-classes';
import events from 'events';

$(document).ready(function () {

  const database = firebaseModule;
  router.start();
  resize.toggleClasses();
  events.start();

  firebaseDb.onAuthStateChanged(database, user => {
    if (user) {

      userState.logIn(user);
      localStorage.setItem('username', user.displayName);
      localStorage.setItem('userUid', user.uid);

    } else {

      userState.logOut();
      localStorage.setItem('username', null);
      localStorage.setItem('userUid', null);

    }
  });
});