import helpers from "../../scripts/utils/helpers";

const init = () => {
    const furniture = document.querySelectorAll('.slider');

    function sliderInit() {
        if (furniture.length) {
            console.log('init', furniture.length)

            const sliders = document.querySelectorAll('.slider');

            sliders.forEach((slider, index) => {
                if(!helpers.isDevices()) {
                    if($(slider).hasClass('for-devices')) {
                        return;
                    }
                }

                if(helpers.isDevices()) {
                    if($(slider).hasClass('for-desktop')) {
                        return;
                    }
                }

                $(slider).slick({
                    dots: true,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 7000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    touchThreshold:100,
                    arrows: true,
                    prevArrow:"<button type='button' class='slick-prev pull-left'><svg width=\"17\" height=\"30\" viewBox=\"0 0 17 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                        "<path d=\"M16.5036 2.07552C16.4064 1.39726 16.3561 0.704349 16.3561 0H16.0467C16.0467 8.1972 9.22941 14.8545 0.821777 14.8545V15.1402C9.22941 15.1402 16.0467 21.7922 16.0467 30H16.3561C16.3561 29.2952 16.4064 28.6018 16.5036 27.9232V2.07552Z\" fill=\"white\"/>\n" +
                        "</svg>\n</button>",
                    nextArrow:"<button type='button' class='slick-next pull-right'><svg width=\"16\" height=\"30\" viewBox=\"0 0 16 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                        "<path d=\"M-0.000159264 2.07552C0.0970678 1.39726 0.147337 0.704349 0.147337 0H0.456708C0.456708 8.1972 7.27401 14.8545 15.6816 14.8545V15.1402C7.27401 15.1402 0.456708 21.7922 0.456708 30H0.147337C0.147337 29.2952 0.0970678 28.6018 -0.000159264 27.9232V2.07552Z\" fill=\"white\"/>\n" +
                        "</svg>\n</button>"
                });

                // console.log($(slider)[0])
                //
                // let slideIndex = $(slider).find('.slider-item').length;
                // console.log(slideIndex)

            })
        }
    }

    sliderInit();


    // $(document).on('add-slick-el', (event, index) => {
    //     $(`.gallery--portfolio .slider--${index}`).slick('slickAdd','<div><div class="slider-item"><img src="/assets/images/project.jpg" alt=""></div></div>'); // шаблон
    //     $(`.gallery--portfolio .slider--${index}`).slick('refresh'); //
    // });

    $(document).on('slick-reload', () => {
        $('.slider').filter('.slick-initialized').slick('unslick');
        sliderInit();
    });

    $(document).on('click', '.load-more', function(){
        var targetContainer = $('.loadmore_wrap'),
            url =  $('.load-more').attr('data-url');
        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){
                    $('.load-more').remove();
                    var elements = $(data).find('.loadmore_item'),
                        pagination = $(data).find('.load-more');
                    targetContainer.append(elements);
                    $(".gallery---wrappper").append(pagination);

                    $(document).trigger('slick-reload');
                }
            })
        }
    });

    // $(document).trigger('add-slick-el', 1); // событие на добавление элемента вместо 1 ставим идентификатор
};

export default {
    init,
}
