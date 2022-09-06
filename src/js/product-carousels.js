export default class Carousels {
	carousels = [];

	constructor() {
		this.carousels = document.querySelectorAll(
			'.js-product-carousel ul.products'
		);
	}

	init() {
		this.carousels.forEach((carousel) => {
			let desktopCards = 5;
			if (carousel.parentNode.className.indexOf('related') > -1) {
				desktopCards =
					Array.from(carousel.children).length < 5
						? Array.from(carousel.children).length
						: 5;
			}
			jQuery(carousel).slick({
				dots: false,
				infinite: false,
				speed: 300,
				slidesToShow: desktopCards,
				slidesToScroll: desktopCards,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3.25,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2.4,
							slidesToScroll: 1,
						},
					},
				],
			});
		});
	}
}
