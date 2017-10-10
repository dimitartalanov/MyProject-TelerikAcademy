const userState = (function () {
  function logIn(user) {
    $('.log-in-btn').hide();
    $('.log-out-btn').show();
    $('.register-btn').hide();
    $('.log-in-btn').removeClass('active');
    $('.p-navbar').removeClass('active');

    if (window.location.href.split('#/')[1] === 'home') {
      $('.home-navbar').addClass('active');
    }
    if (user.displayName) {
      $('.user-name').html(`Hi ${user.displayName}`);
    }
  }
  function logOut() {
    $('.log-in-btn').show();
    $('.log-out-btn').hide();
    $('.register-btn').show();
    $('.user-name').html('');
    $('.log-out-btn').removeClass('active');

    if (window.location.href.split('#/')[1] === 'login') {
      $('.log-in-btn').addClass('active');
    }
  }
  return { logIn, logOut };
}());
export default userState;