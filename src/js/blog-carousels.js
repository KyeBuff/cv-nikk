export default class Carousels {
	carousels = [];

	constructor() {
		this.carousels = document.querySelectorAll('.single-post .elementor-posts');
	}

	init() {
		this.carousels.forEach((carousel) => {
			jQuery(carousel).slick({
				dots: false,
				infinite: false,
				speed: 300,
				slidesToShow: 3,
				slidesToScroll: 1,
				prevArrow:
					'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
				nextArrow:
					'<button class="slick-next" aria-label="Next" type="button">Next</button>',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2.2,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1.1,
							slidesToScroll: 1,
						},
					},
				],
			});
		});
	}
}
