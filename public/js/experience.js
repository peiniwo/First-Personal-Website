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
