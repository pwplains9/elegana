import LocomotiveScroll from 'locomotive-scroll';

import helpers from '@scripts/utils/helpers';

const $scroller = document.querySelector('[data-scroll-container]'); // Set 0 and object with {duration: 1}

let scroller = null;

const getElement = () => $scroller;

const getInstance = () => scroller;

const getPosition = () => scroller.scroll.instance.scroll.y;

// 0, false, 1000
const setPosition = (position, options = {}) => {
    scroller.scrollTo(position, {
        duration: 0,
        disableLerp: true,
        ...options,
    });
};

const onScroll = (callback, options = {}) => {
    if (options.once) {
        const func = () => {
            callback();

            scroller.off('scroll', func);
        }

        scroller.on('scroll', func);
    } else {
        scroller.on('scroll', callback);
    }
}

const makeFriendsWithScrollTrigger = () => {
    onScroll(ScrollTrigger.update);

    ScrollTrigger.addEventListener('refresh', () => scroller.update());

    ScrollTrigger.scrollerProxy($scroller, {
        scrollTop(value) {
            if (arguments.length) {
                setPosition(value);
            }

            return getPosition();
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: innerWidth,
                height: innerHeight,
            };
        },
        pinType: 'transform',
    });

    ScrollTrigger.defaults({
        scroller: $scroller,
    });

    ScrollTrigger.refresh();
};

const init = () => {
    if ($scroller === null) {
        return;
    }

    if(helpers.isMobile) {
        $('.about-card--first').removeAttr('data-scroll')
    }

    const isDevices = helpers.isDevices();

    scroller = new LocomotiveScroll({
        el: $scroller,
        smooth: true,
        lerp: isDevices ? 0.1 : 0.03,
        multiplier: isDevices ? 1.25 : 1,
        firefoxMultiplier: isDevices ? 62 : 100,
        touchMultiplier: isDevices ? 2.25 : 2,
        scrollFromAnywhere: true,
        tablet: {
            smooth: true,
        },
        smartphone: {
            smooth: false,
        },
    });

    makeFriendsWithScrollTrigger();

    onScroll(_throttle((e) => {
        if (e.scroll.y > e.limit.y) {
            setPosition(e.limit.y);
        }
    }, 250));

    toTop();

    setTimeout(() => {
        scroller.update();
    }, 500)

    if (helpers.isScrollLocked()) {
        scroller.stop();
    }
};

const isScrollLocked = () => {
    scroller.stop();
}

const isScrollUnlocked = () => {
    scroller.start();
}

const isScrollUpdate = () => {
    scroller.update();
}

const scrollToEl = (el) => {
    scroller.scrollTo(el);
}

const toTop = () => {
    let header = document.querySelector('.header');
    let button = document.querySelector('.to-top');


    if($('.index').length) {
        return;
    }

    button.addEventListener('click', () => {
        scrollToEl(header);
    });

    onScroll(_throttle((e) => {
        if (e.scroll.y > ((e.limit.y * 30) / 100)) {
            button.classList.add('is-view');
        } else {
            button.classList.remove('is-view');
        }
    }, 250));
}

export default {
    init,
    onScroll,
    setPosition,
    getPosition,
    getInstance,
    getElement,
    isScrollLocked,
    isScrollUnlocked,
    isScrollUpdate,
};
