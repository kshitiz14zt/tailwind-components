    $(document).ready(function () {
      $('.slick-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: false,
        speed: 500,
  
        responsive: [
          {
            breakpoint: 1280,
            settings: { slidesToShow: 3}
          },
          {
            breakpoint: 1024,
            settings: { slidesToShow: 2 }
          },
          {
            breakpoint: 640,
            settings: { slidesToShow: 1 }
          }
        ]
      });
    });