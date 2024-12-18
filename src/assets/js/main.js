


(function ($) {



  /*----------------------------------------
        Scroll to top
----------------------------------------*/
  function BackToTop() {

    $('.scrolltotop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 800);
      return false;
    });

    $(document).scroll(function () {
      var y = $(this).scrollTop();
      if (y > 600) {
        $('.scrolltotop').fadeIn();
      } else {
        $('.scrolltotop').fadeOut();
      }
    });

  }
  BackToTop();

  /*-------------------------------------------------*/
  /*    scroll between sections
  /*-------------------------------------------------*/

  // Add scrollspy to <body>
  $('body').scrollspy({
    target: ".list_menu",
    offset: 50
  });

  // Add smooth scrolling on all links inside the navbar
  $("#list-menu a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;


      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  $('.list-details-tab li').on('click', (function () {
    $('li').removeClass("active");
    $(this).addClass("active");
  }));


  /* ----------------------------------------
        Hide Show Header on Scroll
  ------------------------------------------ */
  function HideShowHeader() {

    var didScroll;
    var lastScrollTop = 0;
    var delta = 50;
    var navbarHeight = 75;
    var navbarHideAfter = navbarHeight

    $(window).scroll(function (event) {
      didScroll = true;
    });

    if ($('.scroll-hide').length > 0) {

      setInterval(function () {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 100);
    }
    return false;

    function hasScrolled() {
      var st = $(this).scrollTop();

      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      if (st > lastScrollTop && st > navbarHideAfter) {
        if ($('.scroll-hide').length > 0) {
          $('header').addClass('hide');
        }
      } else {
        if ($('.scroll-hide').length > 0) {
          if (st + $(window).height() < $(document).height()) {
            $('header').removeClass('hide');
            $('.header.transparent').addClass('scroll');
          }
        }

        if ($(window).scrollTop() < 300) {
          $('.header.transparent').removeClass('scroll');
        }
      }

      lastScrollTop = st;
    }
  }
  HideShowHeader();

  /*------------------------------------------
        sticky single listing menu
  -------------------------------------------*/
  $(window).on('load resize', function () {
    var containerWidth = $(".container").width();
    $('.fixed_nav').css('width', containerWidth);
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 700) {
      $('.list_menu').addClass('fixed-header');
    } else {
      $('.list_menu').removeClass('fixed-header');
    }
  });
  /* ----------------------------------------
         CounteUp
  ------------------------------------------*/


  /*--------------------------------------------
                     Video Player

  /* -----------------------------------------
                  Google Map
  -------------------------------------------*/
  /* if ($('#map').length > 0) {
       google.maps.event.addDomListener(window, 'load', init);

       function init() {
           // Basic options for a simple Google Map
           // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
           var mapOptions = {
               // How zoomed in you want the map to start at (always required)
               zoom: 15,

               // The latitude and longitude to center the map (always required)
               center: new google.maps.LatLng(40.6700, -73.9400), // New York

               scrollwheel: false,


               // How you would like to style the map.
               // This is where you would paste any style found on Snazzy Maps.
               styles: [{
                           "featureType": "administrative",
                           "elementType": "geometry",
                           "stylers": [{
                               "visibility": "off"
                           }]
                       },
                       {
                           "featureType": "administrative.land_parcel",
                           "elementType": "labels",
                           "stylers": [{
                               "visibility": "off"
                           }]
                       },
                       {
                           "featureType": "poi",
                           "stylers": [{
                               "visibility": "off"
                           }]
                       },
                       {
                           "featureType": "road",
                           "elementType": "labels.icon",
                           "stylers": [{
                               "visibility": "off"
                           }]
                       },
                       {
                           "featureType": "road.local",
                           "elementType": "labels",
                           "stylers": [{
                               "visibility": "off"
                           }]
                       },
                       {
                           "featureType": "transit",
                           "stylers": [{
                               "visibility": "off"
                           }]
                       }]
           };

           // Get the HTML DOM element that will contain your map
           // We are using a div with id="map" seen below in the <body>
           var mapElement = document.getElementById('map');

           // Create the Google Map using our element and options defined above
           var map = new google.maps.Map(mapElement, mapOptions);

           var image = 'images/others/marker.png';
           // Let's also add a marker while we're at it
           var marker = new google.maps.Marker({
               position: new google.maps.LatLng(40.6700, -73.9400),
               map: map,
               icon: image,
               draggable: true,
               animation: google.maps.Animation.DROP
           });
           marker.addListener('click', toggleBounce);

           function toggleBounce() {
               if (marker.getAnimation() !== null) {
                   marker.setAnimation(null);
               } else {
                   marker.setAnimation(google.maps.Animation.BOUNCE);
               }
           }
       }
   }*/
  // Intialize Map

  jQuery(document).ready(function ($) {
    "use strict";

    /* -------------------------------------
          Footer Accordion
    -------------------------------------- */
    $(".nav-folderized h2").on('click', (function () {
      $(this).parent(".nav").toggleClass("open");
      $('html, body').animate({
        scrollTop: $(this).offset().top - 170
      }, 1500);
    }));
    /* -------------------------------------
            Header tab
    -------------------------------------- */
    var listButton = $('.hero__list-item a');

    listButton.on('click', function (event) {
      event.preventDefault();

      listButton.removeClass('active-list');
      $(this).addClass('active-list');

      var $this = $(this);

      if (!$this.hasClass('place')) {
        $this.parents('.hero')
          .addClass('hero-events')
          .find('.places-tab')
          .fadeOut(500, function () {
            $this.parents('.hero')
              .find('.events-tab')
              .fadeIn(500);
          });

      } else {
        $this.parents('.hero')
          .removeClass('hero-events')
          .find('.events-tab')
          .fadeOut(500, function () {
            $this.parents('.hero')
              .find('.places-tab')
              .fadeIn(500);
          });
      }
    });

    /* -------------------------------------
            Responsive menu
    -------------------------------------- */
    var siteMenuClone = function () {

      $('.js-clone-nav').each(function () {
        var $this = $(this);
        $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
      });

      /* setTimeout(function () {

        var counter = 0;
        $('.site-mobile-menu .has-children').each(function () {
          var $this = $(this);

          $this.prepend('<span class="arrow-collapse collapsed">');

          $this.find('.arrow-collapse').attr({
            'data-toggle': 'collapse',
            'data-target': '#collapseItem' + counter,
          });

          $this.find('> ul').attr({
            'class': 'collapse',
            'id': 'collapseItem' + counter,
          });

          counter++;

        });

      }, 1000); */

      $('body').on('click', '.js-menu-toggle', function (e) {
        var $this = $(this);
        e.preventDefault();

        if ($('body').hasClass('offcanvas-menu')) {
          $('body').removeClass('offcanvas-menu');
          $this.removeClass('active');
        } else {
          $('body').addClass('offcanvas-menu');
          $this.addClass('active');
        }
      })

    };
    siteMenuClone();

    /*-------------------------------------------------
                rating stars in reviews
    /*-------------------------------------------------*/



    /*---------------------------------
            Date Picker
    ------------------------------------*/

  });

  /*---------------------------------
             Nice select
  -----------------------------------*/
  /*  $('select').niceSelect(); */

  /*-------------------------------------
            Quantity Slider
   -------------------------------------*/


}(jQuery));
