$(document).ready(function () {
    $(window).on('beforeunload', function() {
        $(window).scrollTop(0);
    });

    // Sliders
    var hero_count_slider = new Swiper('.header-slide__count-slider', {
        direction: 'vertical',
        simulateTouch: false,
        loop: true
    });

    var hero_content_slider = new Swiper('.header-slide__content-slider', {
        direction: 'vertical',
        simulateTouch: false,
        loop: true,
        controller: {
            control: hero_count_slider
        },
        allowTouchMove: false
    });

    var hero_image_slider = new Swiper('.header-slide__image-slider', {
        resistanceRatio: false,
        loop: true,
        navigation: {
            nextEl: '.next-slide-preview'
        },
        controller: {
            control: hero_content_slider
        }
    });

    var clients_slider = new Swiper('.clients-slider', {
        slidesPerView: 1,
        spaceBetween: 22.5,
        centeredSlides: true,
        loop: true,
        breakpoints: {
            768: {
                slidesPerView: 2,
            }
        }
    });


    $('.header-slide__content-slider__progress').on('animationend webkitAnimationEnd oAnimationEnd', function () {
        hero_count_slider.slideNext();
        hero_content_slider.slideNext();
        hero_image_slider.slideNext();
    });

    hero_count_slider.on('slideChange', function () {
        $(".header-slide__content-slider__progress").removeClass("run-animation");
        setTimeout(function () {
            $(".header-slide__content-slider__progress").addClass("run-animation")
        }, 200)
    });

    $('.header-slide__content-slider__slide').not('.swiper-slide-active').attr('aria-disabled', true);
    $('.clients-slider__slide').not('.swiper-slide-active').attr('aria-disabled', true);

    $('.header-slide').hover(function () {
        $(".header-slide__content-slider__progress").toggleClass("paused");
    });

    $(window).scroll(function() {
        $('.animated').each( function(){

            var top_space = $(this).offset().top,
                bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it in */
            if( bottom_of_window > top_space ){

                $(this).removeClass('paused');

            }

        });
    });

    $(window).on("load", function () {
        $(".page-loading").hide();
    });

    // Dark Mode Button
    $('.dark-mode-toggle').click(function () {
        $('body').toggleClass('dark-layout');
        $('.navbar').toggleClass('navbar-light navbar-dark')
    });

    // Input With Icon & Floating Label
    $('.input-icon input, .input-icon textarea').on('focus', function(){
        $(this).next('label').addClass('stay');
    });

    $('.input-icon input, .input-icon textarea').on('blur change', function(){
        if( !$(this).val() == "" ){
            $(this).next('label').addClass('stay');
        } else {
            $(this).next('label').removeClass('stay');
        }
    });

});