import Handlebars from 'handlebars';
const stylingsTemplate = (function () {
  const template = function (name, templateHTML, items) {
    if (name === 'home') {
      $('#carousel-example-generic').show();
      $('.item-nav').hide();
      $('#content').addClass('home');
      const template = Handlebars.compile(templateHTML);
      $('#content').html(template({
        items
      }));
    }
    if (name === 'login') {
      $('#carousel-example-generic').hide();
      $('.item-nav').show().text('Login In');
      $('#content').addClass('login');
      $('#content').html(templateHTML);
    }
    if (name === 'register') {
      $('#carousel-example-generic').hide();
      $('.item-nav').show().text('Register');
      $('#content').addClass('register');
      $('#content').html(templateHTML);
    }
    if (name === 'posts') {
      $('#carousel-example-generic').hide();
      $('.item-nav').show().text('Portfolio Category');
      $('#content').addClass('posts');

      const template = Handlebars.compile(templateHTML);
      $('#content').html(template({
        items
      }));
      $('#pagination').find('a').eq(items.page - 1).addClass('active')
    }
    if (name === 'post') {
      $('#carousel-example-generic').hide();
      $('.item-nav').show().text('The Post on User');
      $('#content').addClass('posts');
      const template = Handlebars.compile(templateHTML);
      $('#content').html(template({
        items
      }));

    }
    if (name === 'portfolio') {
      $('#carousel-example-generic').hide();
      $('.item-nav').show().text('Portfolio');
      $('#content').addClass('posts');
      const template = Handlebars.compile(templateHTML);
      $('#content').html(template({
        items
      }));
      $('.portfolio-container').addClass('portfolio');
    }
    if (name === 'contact') {
      $('#carousel-example-generic').hide();
      $('.item-nav').show().text('Contact');
      $('#content').addClass('posts');
      $('#content').html(templateHTML);
    }
    if (name === 'notFound') {
      $('#content').html(templateHTML);
    }
    if (name === 'profile') {
      $('#carousel-example-generic').hide();
      $('.item-nav').show().text('Profile');
      $('#content').addClass('posts');
      const template = Handlebars.compile(templateHTML);
      $('#content').html(template({
        items
      }));
    }
  }
  return { template }
}());
export default stylingsTemplate;
