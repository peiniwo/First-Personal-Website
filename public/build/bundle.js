/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var fetchPage = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var pageInit = {
		experience: __webpack_require__(3),
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
	


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function() {
	  //Slides
	    $('.next').click(function() {
	        var currentSlide = $('.active-slide');
	        var nextSlide = currentSlide.next();
	
	        if(nextSlide.length === 0) {
	            nextSlide = $('.slide').first();
	        }
	        currentSlide.fadeOut(600).removeClass('active-slide');
	        nextSlide.fadeIn(600).addClass('active-slide');
	    });
	
	    $('.prev').click(function() {
	        var currentSlide = $('.active-slide');
	        var prevSlide = currentSlide.prev();
	
	        if(prevSlide.length === 0) {
	          prevSlide = $('.slide').last();
	        }
	        currentSlide.fadeOut(600).removeClass('active-slide');
	        prevSlide.fadeIn(600).addClass('active-slide');
	    });
	
	    //Years
	    $('.next').click(function() {
	        var currentYear = $('.active-year');
	        var nextYear = currentYear.next();
	
	        if(nextYear.length === 0) {
	            nextYear = $('.workYear').first();
	        }
	        currentYear.removeClass('active-year');
	        nextYear.addClass('active-year');
	    });
	
	    $('.prev').click(function() {
	        var currentYear = $('.active-year');
	        var prevYear = currentYear.prev();
	
	        if(prevYear.length === 0) {
	          prevYear = $('.workYear').last();
	        }
	        currentYear.removeClass('active-year');
	        prevYear.addClass('active-year');
	    });
	     //year dot
	    $('.next').click(function() {
	        var currentDot = $('.active-dot');
	        var nextDot = currentDot.next();
	
	        if(nextDot.length === 0) {
	            nextDot = $('.yearDot').first();
	        }
	        currentDot.removeClass('active-dot');
	        nextDot.addClass('active-dot');
	    });
	
	    $('.prev').click(function() {
	        var currentDot = $('.active-dot');
	        var prevDot = currentDot.prev();
	
	        if(prevDot.length === 0) {
	          prevDot = $('.yearDot').last();
	        }
	        currentDot.removeClass('active-dot');
	        prevDot.addClass('active-dot');
	    });
	}; 
	


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map