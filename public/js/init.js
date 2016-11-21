'use strict'
require('lightbox2');
window.jQuery = window.$ = require('jquery');

var fetchPage = require('./fetchPage.js');
var attachClickEvent = function() {
	var upperMenu = ['academic', 'experience', 'competencies'];
	$('.dotted').on('click', function(event) {
		event.stopPropagation();
		var target = event.target;
		var targetClass = target.classList[1];
		fetchPage(targetClass);
		window.history.pushState({}, null, targetClass);
		$('.menuBar').removeClass('hidden');
		if (upperMenu.indexOf(targetClass) === -1) {
			$('.navi').removeClass('current');
			$('.navi:nth-child(2)').addClass('current');
		}
		$('.active').removeClass('active');
		$('.word .' + targetClass).addClass('active');
	});
};

var attachMenuBarEvent = function() {
	$('.navi').on('click', function(event) {
		event.stopPropagation();
		$('.navi.current').removeClass('current');
	    $(this).addClass('current');
	});
	$('.word li').on('click', function(event) {
		event.stopPropagation();
		var target = event.target;
		var targetClass = target.className;
		$('.active').removeClass('active');
		$(target).addClass('active');
		$('.dotted.' + targetClass).trigger('click');
	});
};

var getURL = function () {
	if (window.location.pathname !== '/') {
		var pageName = window.location.pathname.replace('/', '');
		var pageNames = ['academic', 'experience', 'competencies', 'education', 'portfolio', 'techskills'];
		var portfolioPage = ['portfolio-graphic', 'portfolio-jewelry', 'portfolio-painting', 'portfolio-webdesign'];
		if (pageNames.indexOf(pageName) > -1) {
			$('.dotted.' + pageName).trigger('click');
		} else if (portfolioPage.indexOf(pageName) > -1) {
			fetchPage(pageName);
		} else {
			window.location.pathname = '/';
		}
	}
};

var init = function() {
	attachClickEvent();
	attachMenuBarEvent();
	getURL();
};
init();
