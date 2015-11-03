(function(){
    'use strict';
    function limitChars(){
      var $titleTalk = document.querySelectorAll('.lecture-title');
      Array.prototype.forEach.call($titleTalk,function(element,item){
        if( $titleTalk[item].innerHTML.length > 56 ){
          $titleTalk[item].innerHTML = $titleTalk[item].innerHTML.substring(0,50) + '...';
        }
      });
    } 
    limitChars()
}());