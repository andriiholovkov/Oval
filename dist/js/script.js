$(document).ready(function(){
    $('.testimonials__slider').slick({
      arrows: false,
      dots: true,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToSkroll: 1,
      speed: 1000,
      easing: 'ease',
      infinite: false,
      initialSlide: 0,
      autoplay: false,
      autoplaySpeed: 3000,
      pauseOnFocus: true,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      waitForAnimate: true,
      responsive:[
        {
          breakpoint: 1199,
          settings: {
            arrows: false,
            dots: false,
            slidesToShow: 3,
          }
        },{
          breakpoint: 767,
          settings: {
            arrows: true,
            dots: false,
            slidesToShow: 1,
          }
        }
      ],
      mobileFirst: true,
    });
});