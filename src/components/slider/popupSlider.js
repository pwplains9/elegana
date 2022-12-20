import scroller from "@components/scroller/scroller";
import helpers from "../../scripts/utils/helpers";

const init = () => {
    const gallery = document.querySelectorAll('.popup-slider');

    if (!gallery.length) {
        return;
    }

    const sliders = document.querySelectorAll('.popup-slider');
    const $popup = document.querySelectorAll('.popup')
    const $popupContent = document.querySelector('.popup-content')
    const $closeButton = document.querySelectorAll('.popup-close')
    const $bg = document.querySelectorAll('.popup-bg')
    const $open = document.querySelectorAll('.js-popup');
    let sliderEl;

    const sliderInit = () => {
        sliders.forEach((slider) => {
            if ($(slider).hasClass('slick-initialized')) {
                return;
            }
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
                prevArrow: "<button type='button' class='slick-prev pull-left'><svg width=\"17\" height=\"30\" viewBox=\"0 0 17 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" + "<path d=\"M16.5036 2.07552C16.4064 1.39726 16.3561 0.704349 16.3561 0H16.0467C16.0467 8.1972 9.22941 14.8545 0.821777 14.8545V15.1402C9.22941 15.1402 16.0467 21.7922 16.0467 30H16.3561C16.3561 29.2952 16.4064 28.6018 16.5036 27.9232V2.07552Z\" fill=\"white\"/>\n" + "</svg>\n</button>",
                nextArrow: "<button type='button' class='slick-next pull-right'><svg width=\"16\" height=\"30\" viewBox=\"0 0 16 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" + "<path d=\"M-0.000159264 2.07552C0.0970678 1.39726 0.147337 0.704349 0.147337 0H0.456708C0.456708 8.1972 7.27401 14.8545 15.6816 14.8545V15.1402C7.27401 15.1402 0.456708 21.7922 0.456708 30H0.147337C0.147337 29.2952 0.0970678 28.6018 -0.000159264 27.9232V2.07552Z\" fill=\"white\"/>\n" + "</svg>\n</button>"
            });

            $(document).on('slider-destroy', () => {
                $(slider).slick('unslick');
            })

            $(document).on('slider-resize', () => {
                $(slider).slick('setPosition')
            })
        });
    }
    const open = (event) => {
        if (helpers.isAnimating()) {
            return;
        }

        helpers.isAnimating(true);

        let popup = document.querySelector(`.popup[data-item="1"]`);

        let content = popup.querySelector('.popup-content');

        const data = {
            title: 'test', number: 'number', line: [{
                param: '123', value: '123',
            }, {
                param: '123', value: '123',
            }, {
                param: '123', value: '123',
            },],
        }


        function createContent() {
            let $info = event.target.closest('.js-popup').closest('.gallery-item').querySelector('.popup-info');

            if(!$info) {
                return;
            }

            let $title = $info.querySelector('.title');
            let $date = $info.querySelector('.date');
            let $area = $info.querySelector('.area');
            let $price = $info.querySelector('.price');
            let $gallery = $info.querySelector('.gallery');

            let title = popup.querySelector('.popup-title');
            let number = popup.querySelector('.popup-number');
            let info = popup.querySelector('.popup-info');
            title.textContent = $title.textContent;
            number.textContent = $date.textContent;
            info.querySelector('#area').textContent = $area.textContent;
            info.querySelector('#price').textContent = $price.textContent;
            document.querySelector('.popup-slider').innerHTML = '';

            $gallery.querySelectorAll('.item').forEach((img, index) => {
                let image = img.querySelector('img');

                document.querySelector('.popup-slider').innerHTML += `<div class="popup-slider"><img src='${image.src}' alt=""></div>`;
            })
        }

        if (popup.classList.contains('is-hidden')) {
            scroller.isScrollLocked();
            gsap.timeline({
                onComplete: () => {
                    helpers.isAnimating(false);
                }
            }).from(popup, 0.5, {
                opacity: 0, onStart: () => {
                    popup.classList.remove('is-hidden');
                    popup.classList.add('is-active');

                    createContent();
                }, onComplete: () => {
                    sliderInit();
                }
            }).from(content, 0.5, {
                opacity: 0, y: 50, onStart: () => {
                    content.classList.remove('is-hidden');

                    $(document).trigger('slider-resize')
                }
            })
        }
    }
    $open.forEach((button, index) => {

        if (!$popup.length) {
            return;
        }


        // button.addEventListener('click', (event) => {
        //     let name = event.currentTarget.getAttribute('data-project');
        //
        //     if (!name) {
        //         return;
        //     }
        //
        //
        // })


    });

    document.addEventListener("click", function (event) {
        const target = event.target.closest('.js-popup');

        // let name = target.getAttribute('data-project');

        if (!target) {
            return;
        }

        open(event);
    });

    const close = () => {
        if (helpers.isAnimating()) {
            return;
        }

        let popup = document.querySelector(`.popup.is-active`);
        let content = popup.querySelector('.popup-content');

        gsap.timeline().to(content, 0.5, {
            opacity: 0, y: 50, clearProps: true, onComplete: () => {
                content.classList.add('is-hidden');
            }
        }).to(popup, 0.5, {
            opacity: 0, clearProps: true, onComplete: () => {
                popup.classList.add('is-hidden');
                popup.classList.remove('is-active');
                $(document).trigger('slider-destroy');

                scroller.isScrollUnlocked();
                gsap.killTweensOf([popup, content])
            }
        })
    }

    // $open.forEach((el) => {
    //     el.addEventListener('click', () => {
    //         open();
    //     })
    // });

    $closeButton.forEach((item, index) => {
        item.addEventListener('click', () => {
            close();
        })
    })

    $bg.forEach((item, index) => {
        item.addEventListener('click', () => {
            close();
        })
    })
};

export default {
    init,
}
