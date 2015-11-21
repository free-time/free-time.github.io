
(function(){
    'use strict';
    function limitChars(){
      var $titleTalk = document.querySelectorAll('.lecture-title');
      Array.prototype.forEach.call($titleTalk,function(element,item){
        if( $titleTalk[item].innerHTML.length > 50 ){
          $titleTalk[item].innerHTML = $titleTalk[item].innerHTML.substring(0,50) + '...';
        }
      });
    } 
    limitChars()

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
    itemSelector  : "#main",
  });
});

}());