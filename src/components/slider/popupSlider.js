import scroller from "@components/scroller/scroller";
import helpers from "../../scripts/utils/helpers";

const init = () => {
    const gallery = document.querySelectorAll('.popup-slider');

    if (!gallery.length) {
        return;
    }

    const sliders = document.querySelectorAll('.popup-slider');
    const $popup = document.querySelector('.popup')
    const $popupContent = document.querySelector('.popup-content')
    const $closeButton = document.querySelector('.popup-close')
    const $bg = document.querySelector('.popup-bg')
    const $open = document.querySelectorAll('.js-popup');
    let sliderEl;

    const sliderInit = () => {
        sliders.forEach((slider) => {
            if (!helpers.isDevices()) {
                if ($(slider).hasClass('for-devices')) {
                    return;
                }
            }

            if (helpers.isDevices()) {
                if ($(slider).hasClass('for-desktop')) {
                    return;
                }
            }

            $(slider).slick({
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 7000,
                slidesToShow: 1,
                arrows: true,
                prevArrow: "<button type='button' class='slick-prev pull-left'><svg width=\"17\" height=\"30\" viewBox=\"0 0 17 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "<path d=\"M16.5036 2.07552C16.4064 1.39726 16.3561 0.704349 16.3561 0H16.0467C16.0467 8.1972 9.22941 14.8545 0.821777 14.8545V15.1402C9.22941 15.1402 16.0467 21.7922 16.0467 30H16.3561C16.3561 29.2952 16.4064 28.6018 16.5036 27.9232V2.07552Z\" fill=\"white\"/>\n" +
                    "</svg>\n</button>",
                nextArrow: "<button type='button' class='slick-next pull-right'><svg width=\"16\" height=\"30\" viewBox=\"0 0 16 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "<path d=\"M-0.000159264 2.07552C0.0970678 1.39726 0.147337 0.704349 0.147337 0H0.456708C0.456708 8.1972 7.27401 14.8545 15.6816 14.8545V15.1402C7.27401 15.1402 0.456708 21.7922 0.456708 30H0.147337C0.147337 29.2952 0.0970678 28.6018 -0.000159264 27.9232V2.07552Z\" fill=\"white\"/>\n" +
                    "</svg>\n</button>"
            });

            $(document).on('slider-destroy', () => {
                $(slider).slick('unslick');
            })

            $(document).on('slider-resize', () => {
                $(slider).slick('setPosition')
            })
        });
    }

    const slidersReset = () => {
        sliders.forEach((slider) => {

        })
    }

    const slidersDestroy = () => {
        sliders.forEach((slider) => {

        })
    }

    const open = (event) => {
        if ($popup.classList.contains('is-hidden')) {
            scroller.isScrollLocked();
            gsap.timeline().from($popup, 0.5, {
                opacity: 0,
                onStart: () => {
                    $popup.classList.remove('is-hidden');
                },
                onComplete: () => {
                    sliderInit();
                }
            }).from($popupContent, 0.5, {
                opacity: 0,
                y: 50,
                onStart: () => {
                    $popupContent.classList.remove('is-hidden');

                    $(document).trigger('slider-resize')
                }
            })
        }
    }

    const close = () => {
        gsap.timeline().to($popupContent, 0.5, {
            opacity: 0,
            y: 50,
            clearProps: true,
            onComplete: () => {
                $popupContent.classList.add('is-hidden');
            }
        }).to($popup, 0.5, {
            opacity: 0,
            clearProps: true,
            onComplete: () => {
                $popup.classList.add('is-hidden');

                slidersDestroy();

                $(document).trigger('slider-destroy');

                scroller.isScrollUnlocked();
                gsap.killTweensOf([$popup, $popupContent])
            }
        })
    }

    $open.forEach((el) => {
        el.addEventListener('click', () => {
            open();
        })
    });

    $closeButton.addEventListener('click', () => {
        close();
    })
    $bg.addEventListener('click', () => {
        close();
    })
};

export default {
    init,
}
