const init = () => {
    const furniture = document.querySelectorAll('.reviews');

    if (furniture.length) {
        console.log('init')

        const sliders = document.querySelectorAll('.reviews-slider');
        const cards = document.querySelectorAll('.reviews-card')

        sliders.forEach((slider) => {
            $(slider).slick({
                dots: true,
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                ]
            });
        });

        cards.forEach((item) => {
            const buttonMore = item.querySelector('.reviews-more');
            const text = item.querySelectorAll('.text');
            console.log(text.length)

            if (text.length > 2) {
                text.forEach((textItem) => {
                    textItem.classList.add('is-hidden')

                })
                text[0].classList.remove('is-hidden')
                text[1].classList.remove('is-hidden')
            }

            buttonMore.addEventListener('click', (event) => {
                const el = event.currentTarget.closest('.reviews-card');
                if (!el.classList.contains('is-open')) {
                    el.classList.add('is-open');

                    text.forEach((textItem) => {
                        textItem.classList.remove('is-hidden')

                    })
                }
            });
        })
    }

};

export default {
    init,
}
