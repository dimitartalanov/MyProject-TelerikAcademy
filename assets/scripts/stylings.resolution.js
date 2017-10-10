const resize =
  (function () {
    const toggleClasses = function () {

      const wi = $(window).width();

      if (wi < 950) {
        $('.row-fixed').each(function (index, el) {
          $(el).removeClass('triggered');

          $('.resize-img').hide();
        });
        $('.navbar-collapse').removeClass('center-block');
        $('.icon').show();
        $('#copyright').show()

        if (wi < 768) {
          $('body').addClass('mobile');
          $('.icon').hide();
          $('#copyright').hide();
          $('.carousel-inner').hide();
        }

        if (wi > 768) {

          $('body').removeClass('mobile');
          $('.carousel-inner').show();
        }
      } else if (wi > 951) {
        $('.carousel-inner').show();
        $('.row-fixed').each(function (index, el) {
          $(el).addClass('triggered');
        });
        $('.navbar-collapse').addClass('center-block');
        $('body').removeClass('mobile');
        $('.icon').show();
        $('#copyright').show()

        if (wi < 1340) { $('.resize-img').hide(); } else { $('.resize-img').show(); }
      }
    };

    $(window).resize(function () {
      toggleClasses();
    });
    return { toggleClasses }
  }());

export default resize;



