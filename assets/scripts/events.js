
import dbController from 'db-controller';
const events = (function () {
  const start = function () {
    const pages = ['home', 'posts/1', '', 'portfolio', 'contact', 'login', 'register', 'profile'];
    const currPage = window.location.href.split('#/')[1];


    pages.forEach((page, index) => {

      if (currPage === page) {
        $('.nav.navbar-nav').children().eq(index).addClass('active')
        $('.nav.nav-pills').children().eq(index).addClass('active')
      } else {
        $('.nav.navbar-nav').children().eq(index).removeClass('active')
        $('.nav.nav-pills').children().eq(index).removeClass('active')
      }
      if (currPage.includes('post')) {
        $('.nav.navbar-nav').children().eq(1).addClass('active')
        $('.nav.nav-pills').children().eq(1).addClass('active')
      }
    })
    $('.nav').on('click', function (ev) {

      var target = $(ev.target);

      target.parents('ul').children('li').each(function (index, el) {
        var element = $(el);
        if (element.hasClass('active')) {
          element.removeClass('active');
        }
      });
      target.parents('li').addClass('active');
    });
  }

  const scrollEvent = function () {

    let countItem = 10;
    let paddingBotom = 10;
    const isScrollInPortfolio = window.location.href.split('#/')[1];
    if ($(window).width() < 768) {
      paddingBotom = 600;
    } else { paddingBotom = 10 }

    $(window).scroll(function () {

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - paddingBotom) {

        if (isScrollInPortfolio === 'portfolio') {

          dbController.getAllInCategory('portfolio', 'portfolio', countItem);
          countItem += 10;
        }
      }
    })
  }
  const commentEvent = function () {

    $('#comment-user').on('click', function () {
      event.preventDefault();
      const comment = $(this).parents('.form-group').children('.textarea')
      const text = comment.children('.inside').val();
      const id = comment.children('.id').val();

      dbController.userComment(text, id);
    })
  }
  const photoURL = function () {
    return ($('#photoURL').val());
  }
  const unbindScrollEvent = function () {

    $(window).unbind('scroll');
  }
  return {
    start,
    scrollEvent,
    unbindScrollEvent,
    commentEvent,
    photoURL
  };
}());
export default events;