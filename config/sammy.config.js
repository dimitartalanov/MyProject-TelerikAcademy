import 'jquery';
import Sammy from 'sammy';
import accountController from 'account-controller';
import dbController from 'db-controller';
import events from 'events';

const router = (function () {
  function start() {
    const sammyApp = Sammy('#content', function () {
      this.get('/', function () {
        this.redirect('#/');
      });
      this.get('#/', function () {
        this.redirect('#/home');
      });
      this.get('#/home', function () {

        dbController.getAllInCategory('home', 'portfolio');

        events.unbindScrollEvent();

      });
      this.get('/login', function () {

        dbController.load('login');

      });
      this.get('/register', function () {

        dbController.load('register');

      });
      this.get('/posts/:page', function () {

        dbController.getAllInCategory('posts', 'blog', this.params.page);
        events.unbindScrollEvent();

      });
      this.get('/posts/post/:id', function () {

        dbController.getPostId('post', 'blog', this.params.id);

      });
      this.get('/portfolio', function () {

        dbController.getAllInCategory('portfolio', 'portfolio');
        events.scrollEvent();

      });
      this.get('/contact', function () {

        dbController.load('contact');

      });
      this.get('/profile', function () {

        dbController.getUser('profile');

      })

      this.get('/logout', accountController.signOut);

      this.post('/login', accountController.signIn);
      this.post('/register', accountController.signUp);
      this.notFound = function () {

        dbController.load('notFound');

      };
    });
    sammyApp.run('#/home');
  }
  return {
    start
  };
}());

export default router;