import scroller from "@components/scroller/scroller";
import helpers from "../../scripts/utils/helpers";

const init = () => {
    const $popupForms = document.querySelectorAll('.js-popup-forms');

    const popups = document.querySelectorAll('.popup-form');

    $popupForms.forEach((button, index) => {

        if (!popups.length) {
            return;
        }

        const open = (name) => {
            if (helpers.isAnimating()) {
                return;
            }

            helpers.isAnimating(true);

            let popup = document.querySelector(`.popup-form[data-item="${name}"]`);

            let content = popup.querySelector('.popup-form-content');

            if (popup.classList.contains('is-hidden')) {
                scroller.isScrollLocked();
                gsap.timeline({
                    onComplete: () => {
                        helpers.isAnimating(false);
                    }
                })
                    .from(popup, 0.5, {
                        opacity: 0,
                        clearProps: true,
                        onStart: () => {
                            popup.classList.remove('is-hidden');
                            popup.classList.add('is-active');
                        },
                    }).from(content, 0.5, {
                    opacity: 0,
                    clearProps: true,
                    y: 50,
                    onStart: () => {
                        content.classList.remove('is-hidden');
                    }
                })
            }
        }


        // button.addEventListener('click', (event) => {
        //     let name = event.currentTarget.getAttribute('data-popup');
        //
        //     if (!name) {
        //         return;
        //     }
        //
        //     open(name);
        // })

        document.addEventListener("click", function(event){
            const target = event.target.closest('.js-popup-forms');

            let name = event.target.getAttribute('data-popup');

            if (!name) {
                return;
            }

            open(name);
        });
    });

    const close = () => {
        if (helpers.isAnimating()) {
            return;
        }

        let popup = document.querySelector(`.popup-form.is-active`);
        let content = popup.querySelector('.popup-form-content');
        gsap.timeline().to(content, 0.5, {
            opacity: 0,
            y: 50,
            clearProps: true,
            onComplete: () => {
                content.classList.add('is-hidden');
            }
        }).to(popup, 0.5, {
            opacity: 0,
            clearProps: true,
            onComplete: () => {
                popup.classList.add('is-hidden');
                popup.classList.remove('is-active');

                scroller.isScrollUnlocked();
                gsap.killTweensOf([popup, content])
            }
        })
    }

    const $closeButton = document.querySelectorAll(' .popup-form-close')
    const $bg = document.querySelectorAll(' .popup-form-bg');

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
