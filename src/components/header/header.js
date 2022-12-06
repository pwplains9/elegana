import helpers from '@scripts/utils/helpers';

function openMenu() {
	return new Promise((resolve) => {
		$('.js-burger').addClass('is-disabled').attr('disabled', true);

		helpers.lockScroll(true, helpers.$document.find('.menu'), 'header');

		helpers.$header.addClass('is-menu-opened');
		// $('.menu').removeClass('is-hidden');

		setImmediate(() => {
			$('body').css('padding-right', `${helpers.getScrollbarWidth()}px`);
			helpers.$header.css('right', `${helpers.getScrollbarWidth()}px`);
		});

		setTimeout(() => {
			$('.menu').addClass('is-active');
			$('.js-burger').removeClass('is-disabled').attr('disabled', false);

			resolve();
		}, 100);
	});
}

function closeMenu() {
	return new Promise((resolve) => {
		$('.js-burger').addClass('is-disabled').attr('disabled', true);

		helpers.lockScroll(false, helpers.$document.find('.menu'), 'header');
		$('body').css('padding-right', '');
		helpers.$header.css('right', '');

		helpers.$header.removeClass('is-menu-opened');

		$('.menu').removeClass('is-active');

		setTimeout(() => {
			// $('.menu').addClass('is-hidden');
			$('.js-burger').removeClass('is-disabled').attr('disabled', false);

			resolve();
		}, 500);
	});
}

function toggleMenu(event) {
	event.preventDefault();
	event.stopPropagation();

	if ($('.js-burger').hasClass('is-active')) {
        $('.js-burger').removeClass('is-active');
		closeMenu();
	} else {
        $('.js-burger').addClass('is-active');
		openMenu();
	}
}

function init() {
	helpers.$header = $('.header');

	$('.js-burger').on('click', toggleMenu);

	helpers.$document
		.on('click', (e) => {
			let $container = $('.menu');

			if ($container.is(e.target) && $container.has(e.target).length === 0 && $container.hasClass('is-active')) {
				closeMenu();
				$('.js-burger').removeClass('is-active');
			}
		})
		.on('keyup', (e) => {
			if ((e.key === 'Escape' || e.key === 'Esc') && $('.menu').hasClass('is-active')) {
				closeMenu();
				$('.js-burger').removeClass('is-active');
			}
		});
}

function destroy() {
	$('.js-burger').off('.header');
	helpers.$document.off('.header');
}

export default {
	init,
	destroy,
	openMenu,
	closeMenu,
};
