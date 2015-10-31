(function(){
	function limitChars () {
		var titleTalk = document.querySelector('.lecture-title').textContent;
		if ( titleTalk > 10 ) {
			var minTitle = titleTalk.substring(0,10);
			titleTalk.innerHTML = minTitle + '...';
		}
	}
}());