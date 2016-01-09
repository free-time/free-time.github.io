// Start scroll infinite, popup and script echo.
$(document).ready(function(){
  echo.init({
    offset: 100,
    throttle: 250,
    unload: false,
  });

  $(document).on('click', '.mfp-iframe', function(e){
    e.preventDefault();
    $(this).magnificPopup({type:'iframe'}).magnificPopup('open');
  });

  inphinity('#main').set({
    navSelector : "p.pagination",
    nextSelector  : "p.pagination a.older",
    itemSelector  : "#main div.lectures",
    loader: false
  });

  smoothScroll.init({
    updateURL: false
  });
});

$(function(){
  $('.nav-category').click(function(){
    $('.sub-menu').toggle();
  });
});
