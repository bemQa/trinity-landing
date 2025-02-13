let scrollTop = $(window).scrollTop();

$(window).scroll(function (evt) {
    scrollTop = $(this).scrollTop();
});

$(document).ready(function () {
    // анимация меню
    $('.menu').click(function (e) {
        e.preventDefault();
        (this.classList.contains('active') === true) ? this.classList.remove('active'): this.classList.add('active');

        $('.header').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.menu-links-wrapper, .menu');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.header, .menu').removeClass('active');
            }
        });
    });

    // якоря для ссылок
    $('body').on('click', '.anchor[href^="#"]', function () {
        $('.header').removeClass('active');
        $('.menu').removeClass('active');

        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top - 150;
        $('html, body').animate({
            scrollTop: destination
        }, 500, 'swing');
        return false;
    });

    // табы
    $('body').on('click','.tab-trigger', function(e){
        e.preventDefault();
        let tab = $(this).data('tab');
        $(this).parents('.section').find('.tab-trigger').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.section').find('.tab-item').removeClass('active');
        $(this).parents('.section').find('.tab-item[data-tab="'+ tab +'"]').addClass('active');
    });

    // аккордеон
    function openAccordion() {
        let wrap = $('.accordion-wrap');
        let accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
            let $this = $(this);
            let $parent = $(this).parent();
            let content = $this.next();

            if (content.is(':visible')) {
                $this.removeClass('active');
                $parent.removeClass('active');
                content.slideUp('fast');
            } else {
                $this.addClass('active');
                $parent.addClass('active');
                content.slideDown('fast');
            }

        });
    }
    openAccordion();

    // маски
    if ($('.phone-mask').length) {
        $('.phone-mask').inputmask({
            mask: "+79999999999",
            "clearIncomplete": true
        });
    }

    // открытие модалок
    $('body').on('click','.js-open-modal', function(e){
        e.preventDefault();
        let id = $(this).attr('href');
        Fancybox.show(
            [{src: id}],
            {
                defaultType: "inline", 
                // dragToClose: false,
                // touchMove: false,
                // backdropClick: false
            }
        );
    });

    Fancybox.bind("[data-fancybox]", {
        defaultType: "inline",
        // dragToClose: false,
        // touchMove: false,
        // backdropClick: false
    });

    // тултипы
    $('body').on('click', '.tooltip-trigger', function(e){
        e.preventDefault();
        let $this = $(this);
        let tooltip = $this.siblings('.tooltip');
        tooltip.toggleClass('show');
        $('body').on('click', function (e) {
            let div = $($this, tooltip);

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                tooltip.removeClass('show');
            }
        });
    });

    // фронтовая валидация форм
    function checkValidate() {
        let form = $('.form');
    
        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                errorElement : 'span',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                },
                errorPlacement: function(error, element) {
                    let parent = $(element).parent();
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.appendTo(parent);
                    }
                },
                messages: {
                    required: "Заполните обязательное поле",
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/.test(value);
        });
    }
    if($('.form').length) {
        checkValidate();
    }

    // slider
    const page_slider = new Swiper(".page-slider", {
        slidesPerView: 1,
        loop: false,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});