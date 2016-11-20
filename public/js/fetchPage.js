var pageInit = {
	experience: require('./experience.js'),
}
var fetchPage;
module.exports = fetchPage = function(pageName) {
	var page = document.querySelector('div.' + pageName + 'Page');
	if (page && page.childNodes.length > 0) {
		$('.inView').addClass('hidden');
		if (pageName.indexOf('portfolio-') > -1) {
			$('.works').removeClass('hidden');
		} else {
			$('.works').addClass('hidden');
		}
		$(page).removeClass('hidden').addClass('inView');
	} else {
		$.ajax({
			method: 'get',
			url: '/page/' + pageName,
			success: function(response) {
				$('.inView').addClass('hidden');
				$('.works').addClass('hidden');
				$(page).removeClass('hidden').addClass('inView');
				page.innerHTML = response;
				if (pageInit[pageName]) {
					pageInit[pageName].call();
				}
				if (pageName === 'portfolio') {
				}
				if (pageName.indexOf('portfolio-') > -1) {
					$('.works').removeClass('hidden');
					$('.menuBar').removeClass('hidden');
					portfolioEvent();
				} 
				portfolioEvent();
				attachAnimation(page);
			}
		})
	}
};
var attachAnimation = function(context) {
	$('.classes', context).hide();
	$('.dotMore', context).click(function(){
		$(this).next('.classes').slideToggle('slow');
	});
	$('.uxDesign', context).click(function() {
		$('.portfolio').trigger('click');			
	});
};

	// $('.classes', context).click(function(event) {
	// 	var target = event.target;
	// 	var targetClass = target.classList[1] || target.parentNode.classList[1] ;
	// 	if (targetClass === 'jewelryDesign') {
	// 		console.log('click jewel');
	// 		$('.portfolio-jewelry').trigger('click');
	// 	} else if (targetClass === 'uxDesign') {
	// 		console.log('click jewel');
	// 		$('.portfolio-webdesign').trigger('click');			
	// 	}
	// });

var portfolioEvent = function() {
	$('.portfolio .works  li').on('click', function(event) {
		event.stopPropagation();
		var target = event.target;
		var targetClass = target.classList[0];
		fetchPage(targetClass);
		window.history.pushState({}, null, targetClass);
		$('.menuBar').removeClass('hidden');
		$('.active').removeClass('active');
		$('.word .' + targetClass).addClass('active');
	});
	$('.portfolioIcon a').on('click', function(event) {
		event.stopPropagation();
		var target = event.target;
		var targetClass = target.className || target.parentNode.className;
		$('.portfolio .works  li.' + targetClass).trigger('click');
	});
};

