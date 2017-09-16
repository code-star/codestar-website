export default class Menu {

  closeMenuIfOpen() {
    if ($('.fixed-menu .menu').css('display') !== 'none') {
      $('.fixed-menu .menu').fadeOut(350);
      $('.asterisk .hamburger').removeClass('is-active');
    }
  }

  addMenuClickListener() {
    $('.asterisk').click(() => {
      $('.fixed-menu .menu').fadeToggle(350);
      const $hamburger = $('.asterisk .hamburger');
      if($hamburger.is('.is-active')) {
        $hamburger.removeClass('is-active');
      } else {
        $hamburger.addClass('is-active');
      }
    });
  }

}