/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../lib/waypoints/index.js
//= include ../lib/tilt.jquery.js
//= include ../lib/bg-check.js


// CUSTOM SCRIPTS

$(document).ready(function () {
    // MOBILE MENU

    const nav = $('.header__nav');

    $('.btn-burger').on('click', function (e) {
        e.preventDefault();
        nav.toggleClass('open');
        $(this).toggleClass('open');
        $('body').toggleClass('modal-open');
    });

    $('.menu__link').on('click', function (e) {
        nav.removeClass('open');
        $('.btn-burger').removeClass('open');
        $('body').removeClass('modal-open');
    });

    //OPEN LIST BRIFS

    $('#openListBrief').on('click', function (e) {
        // e.preventDefault();
        $('.header__nav .list').toggleClass('open-list');

    });
    $('.btn-burger, .list__link').click(function (e) {
        e.preventDefault();
        $('.header__nav .list').removeClass('open-list');
    });

    // CONTACT-SIDE-FORM

    const blockWritten = $('.contact-side-form');

    $('.contact-btn').on('click', function (e) {
        e.preventDefault();
        blockWritten.addClass('open');
        $('.backdrop').fadeIn();
        $('body').addClass('modal-open')
    });

    $('.btn-close, .backdrop').click(function (e) {
        e.preventDefault();
        blockWritten.removeClass('open');
        $('.backdrop').fadeOut();
        $('body').removeClass('modal-open')
    });

    //SMOOTH SCROLL TO ANGKOR

    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function (event) {
            let anchor = $.attr(this, 'href')
            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault()
                let offsetSize = $("header").innerHeight();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - offsetSize
                }, 1500)
            }
        })
    }

    // SLIDER-ACCORDION

    let accordionSlider;

    function slidersInit() {
        if ($('.accordion__slider').length > 0) {
            if ($(window).width() <= 768) {
                if (!accordionSlider) {
                    accordionSlider = new Swiper('.accordion__slider', {
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                    });
                }
            } else {
                if (accordionSlider) {
                    if ($.isArray(accordionSlider)) {
                        accordionSlider.forEach(function (slider) {
                            slider.destroy(true, true)
                        });
                    } else {
                        accordionSlider.destroy(true, true);
                    }
                    accordionSlider = null;
                }
            }
        }
    }

    slidersInit();


    // ACCORDION

    const slideAnimationTime = 500;

    $('#accordion .panel__heading, #accordion .accordion__arrow').on('click', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).siblings('.panel-collapse').slideUp(slideAnimationTime);
        } else {
            $('#accordion .panel__heading, #accordion .accordion__arrow').removeClass('open');
            $(this).addClass('open');
            const $curr = $(this);

            setTimeout(function () {
                $('.panel-collapse').slideUp(slideAnimationTime);
                $curr.siblings('.panel-collapse').slideDown(slideAnimationTime);

                setTimeout(function () {
                    if (accordionSlider) {
                        if ($.isArray(accordionSlider)) {
                            accordionSlider.forEach(function (slider) {
                                slider.update();
                            });
                        } else {
                            accordionSlider.update();
                        }
                    }
                }, slideAnimationTime);
            }, 100);
        }
    });


    // Home Banner

    let homeBanner = new Swiper('.banner__slider', {
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        speed: 800,
        autoplay: {
            delay: 3000,
        },
        on: {
            slideChange: function () {
                BackgroundCheck.refresh();
                console.log('swiper slideChange');
            },
        },
    });


    BackgroundCheck.init({
        targets: '.ui',
    });


    // SLIDER-MARQUEE

    function runMarquees() {
        const selector = document.querySelectorAll("._marquee");
        const styles = document.createElement("style");
        const array = [];

        function init() {
            Array.prototype.forEach.call(selector, function (item, index) {
                const marqueeBody = item.querySelector(".marquee-body");
                const direction = item.getAttribute("data-direction");
                array[index] = "marquees-" + Math.random().toString(36).substr(2, 9);
                styles.innerHTML += "\n    @keyframes " + array[index] + " {\n      100% {\n        transform: translateX(" + ("right" === direction ? 0 : -marqueeBody.offsetWidth) + "px);\}\}\n";
                item.style.animation = array[index] + " 20s 0s linear infinite";
                item.style.transform = "translateX(" + ("right" === direction ? -marqueeBody.offsetWidth : 0) + "px)";
            });
        }

        document.body.appendChild(styles);
        window.addEventListener("resize", function () {
            styles.innerHTML = "";
            init();
        });
        Array.prototype.forEach.call(selector, function (e) {
            const marqueeBody = e.querySelector(".marquee-body");
            e.appendChild(marqueeBody.cloneNode(true));
            e.style.width = "100000px";
        });
        setTimeout(function () {
            init();
        }, 500);
    }

    runMarquees();


    // SLIDER RELATED POST

    const sliderRelatedPost = new Swiper('.slider__related-post', {
        slidesPerView: 2,
        spaceBetween: 22,
        navigation: {
            nextEl: '.wrap-slider .swiper-button-next',
            prevEl: '.wrap-slider .swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 22,
            },

            1200: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            1440: {
                slidesPerView: 2,
                spaceBetween: 100,
            },
            1900: {
                slidesPerView: 2,
                spaceBetween: 150,
            },
        }
    });


    // POPUP VIDEO

    $("#video-modal-trigger").click(function (e) {
        e.preventDefault();
        $("#video-popup-wrapper").addClass("active");
        $("body").addClass("modal-open");
    });
    $("#close-video-popup").click(function (e) {
        $("#video-popup-wrapper").removeClass("active");
        $("body").removeClass("modal-open");
        const video = $('#video');
        video.get(0).pause();
    });

    $(window).resize(function () {
        slidersInit();
    });

    //STICKY BTN

    var sticky = new Waypoint({
        element: $('#triggerBtnSticky')[0],
        offset: '50%',
        handler: function (direction) {
            console.log(direction === 'down', direction)
            if (direction === 'down') {
                $('.contact-btn').addClass('sticky');
            } else if (direction === 'up') {
                $('.contact-btn').removeClass('sticky');
            }
        },
    });


    //HIDE TEXT

    $('.text-hide .open-up').on('click', function (e) {
        e.preventDefault();
        $('.text-hide .mob-hide').removeClass('mob-hide');
        $(this).hide();
    });

    //ANIMATIOON

    setTimeout(function () {
        $('.section-team').addClass('active');
    }, 300);

    setTimeout(function () {
        var waypoints = $('.section_anim').waypoint(function (direction) {
            $(this.element).addClass('section_in-view')
        }, {
            offset: '75%'
        });
    }, 300);


    if ($(window).width() < 768) {
        const tilt = $('.js-tilt').tilt()
        tilt.methods.destroy.call(tilt);
    }


    function horScroll() {
        const $canvas = $('#horizontalScrollCanvas');
        const $sticky = $('#horizontalScrollScene');
        const $wrapper = $('.section-develop');
        const canvasWidth = $canvas.get(0).scrollWidth;

        $wrapper.height(canvasWidth);

        $(window).scroll(function () {
            const initialOffset = $wrapper.get(0).offsetTop;
            const $card = $('.develop__card');
            const offsetTop = $sticky.get(0).offsetTop;
            const scrollOffset = -offsetTop;

            const cardsCount = $card.length;
            const cardMargin = parseInt($card.css('marginRight'));
            const newActive = Math.floor(Math.abs(scrollOffset) / ($card.outerWidth() * 0.45 + cardMargin));
            const oldActive = $('.develop__card.active').index();
            const lastIndex = cardsCount - 1;
            const validatedIndex = newActive <= lastIndex ? newActive : lastIndex;

            if (oldActive !== validatedIndex) {
                $card.removeClass('active');
                $card.eq(validatedIndex).addClass('active');
            }

            $canvas.attr('style', `transform:translateX(${scrollOffset}px)`)
            if ($(window).width() <= 980) {
                $card.removeClass('active');
            }
        });
    }
        horScroll();
});
