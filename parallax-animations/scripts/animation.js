$(document).ready(function() {
  function highlightActiveClock(selector) {
    $('.clock-case').removeClass('active');
    if (typeof selector === 'string') {
      console.log(selector)
      selector = $('.clock-case.' + selector);
    }
    selector.addClass('active');
  }
  $('.clock').click(function(event) {
    //    event.stopPropagation();
  });
  $('.clock-case').click(function(event) {
    highlightActiveClock($(this));
    //   $(this).children('.clock').click();
  });
  $('section').mouseover(function() {
    let bg = $(this).prev().children('.wisp').css('backgroundColor').replace(")", ", 0.2)");
    TweenMax.to("body", 2, {backgroundColor: bg});
  });
  $('section.morning').mouseover(function() {
    TweenMax.to(".parallax.morning .wisp", 2, {opacity: 0.8});
    TweenMax.to(".parallax.morning .wisp", 2, {
      top: 410,
      left: 55
    });
    highlightActiveClock('morning');
  });
  $('section.morning').mouseout(function() {
    TweenMax.to(".parallax.morning .wisp", 2, {
      top: 450,
      left: -100
    });
    TweenMax.to(".parallax.morning .wisp", 2, {opacity: 1});
  });
  $('section.afternoon').mouseover(function() {
    TweenMax.to(".parallax.afternoon .wisp", 1, {height: 60});
    TweenMax.to(".parallax.afternoon .wisp", 1, {width: 60});
    TweenMax.to(".parallax.afternoon .wisp", 3, {opacity: 0.8});
    TweenMax.to(".parallax.afternoon .wisp", 3, {
      left: 400,
      bottom: -70
    });
    highlightActiveClock('afternoon');
  });
  $('section.afternoon').mouseout(function() {
    TweenMax.to(".parallax.afternoon .wisp", 5, {
      left: 770,
      bottom: -180
    });
    TweenMax.to(".parallax.afternoon .wisp", 5, {opacity: 0});
  });
  $('section.evening').mouseover(function() {
    TweenMax.to(".parallax.evening .wisp", 3, {
      bottom: -20,
      right: 200
    });
    TweenMax.to(".parallax.evening .wisp", 3, {opacity: 0.8});
    highlightActiveClock('evening');
  });
  $('section.evening').mouseout(function() {
    TweenMax.to(".parallax.evening .wisp", 3, {
      bottom: -120,
      right: -100
    });
  });
  $('section.night').mouseover(function() {
    TweenMax.to(".parallax.night .wisp", 3, {
      top: 60,
      right: 200
    });
    TweenMax.to(".parallax.night .wisp", 3, {opacity: 0.8});
    TweenMax.to(".parallax.night .wisp", 3, {
      opacity: 0.1,
      delay: 3
    });
    highlightActiveClock('night');
  });
  $('section.night').mouseout(function() {
    TweenMax.to(".parallax.night .wisp", 4, {opacity: 0});
  });
});
// scroll to top onload, before document is ready
// Source: https://stackoverflow.com/questions/11486527/reload-browser-does-not-reset-page-to-top
$(window).on('load', () => {
  setTimeout(() => {
    $(window).scrollTop(0);
  }, 0);
});
