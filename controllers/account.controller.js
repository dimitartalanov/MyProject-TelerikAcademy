import userModel from 'user-model';
import firebaseModule from 'firebase-config';
import validator from 'validator';
import events from 'events';

const user = new userModel(firebaseModule);
class AccountController {

  signIn(sammy) {
    const email = sammy.params.email;
    const password = sammy.params.password;

    user
      .signIn(email, password)
      .then(() => {

        sammy.redirect('#/home');


      })
      .catch(error => {
        const message = error.message;
        const $warningContainer = $('.warning');
        $warningContainer.show();
        const $dangerMessageContainer = $('#danger-message-container');
        $dangerMessageContainer.html(message);
      });
  }

  signUp(sammy) {

    const username = validator.formatUserInput(sammy.params.username);
    const email = validator.formatUserInput(sammy.params.email);
    const password = validator.formatUserInput(sammy.params.password);
    const photoURL = events.photoURL();

    user
      .signUp(email, password, username, photoURL)
      .then(() => {

        sammy.redirect('#/home');
        location.reload();

      }).catch(error => {

        const message = error.message;

        const $warningContainer = $('.warning');
        $warningContainer.show();

        const $dangerMessageContainer = $('#danger-message-container');
        $dangerMessageContainer.html(message);
      });
  }
  signOut(sammy) {

    user
      .signOut()
      .then(() => {

        sammy.redirect('#/login');

      }).catch(error => {
        console.log(error)
      });
  }
}

const accountController = new AccountController();
export default accountController;