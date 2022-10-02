import throttle from './utils/throttle';
import ProductCarousels from './product-carousels';
import BlogCarousels from './blog-carousels';

(function () {
	document.addEventListener(
		'DOMContentLoaded',
		function () {
			const contents = document.querySelector(
				'.single-post__sidebar .elementor-toc__header'
			);
			const beforeContentsElement = document.querySelector(
				'.single-post__sidebar .single-post__sidebar-author-meta'
			);
			const downBtn = document.querySelector(
				'.single-post__sidebar .elementor-toc__toggle-button--expand'
			);
			const upBtn = document.querySelector(
				'.single-post__sidebar .elementor-toc__toggle-button--collapse'
			);

			const elementsToIgnore = document.querySelectorAll(
				'.single-post__author-image, .single-post__author-name, .single-post__sidebar-author-meta'
			);

			if (contents && upBtn && downBtn) {
				window.addEventListener(
					'scroll',
					throttle((e) => {
						if (e.target !== document) {
							return false;
						}
						const beforeContentsRect =
							beforeContentsElement.getBoundingClientRect();
						if (window.innerWidth < 992) return false;
						if (beforeContentsRect.top + beforeContentsRect.height - 88 <= 0) {
							upBtn.click();
						} else {
							downBtn.click();
						}
					}),
					200
				);
			}

			const commentCount = document.querySelector('.title-comments');
			const comments = document.querySelector('#comments');

			if (comments && !comments.querySelector('.comment-list')) {
				const noCommentText = document.createElement('p');
				noCommentText.textContent = 'Be the first to comment!';
				noCommentText.className = 'first-to-comment';
				comments.appendChild(noCommentText);
			}

			if (commentCount) {
				const count = commentCount.textContent.split(' ')[0];
				commentCount.innerHTML = `<span class="title-comments__count">${count}</span> Comments`;
			}

			let quantityValue = 0;
			document.addEventListener('focusin', function (e) {
				const el = e.target;
				if (el.matches('.xoo-wsc-qty')) {
					quantityValue = +el.value;
				}
			});
			document.addEventListener('focusout', function (e) {
				const el = e.target;
				if (el.matches('.xoo-wsc-qty')) {
					updateCartCount(+el.value - quantityValue);
					quantityValue = 0;
				}
			});
			const shopNav = document.querySelector('.header-main__nav-items--shop');
			const headerMain = document.querySelector('.header-main');
			const cartCss = document.querySelector('#xoo-wsc-style-inline-css');
			const cartCssContent = cartCss.textContent;

			function stickSideCart() {
				let yPos = 0;
				if (innerWidth < 992) {
					yPos = headerMain.getBoundingClientRect().height;
				} else {
					yPos =
						shopNav.getBoundingClientRect().top +
						shopNav.getBoundingClientRect().height;
				}

				cartCss.textContent =
					cartCssContent +
					' .xoo-wsc-container { top: ' +
					yPos +
					'px !important; }	.xoo-wsc-modal .xoo-wsc-opac {top: ' +
					yPos +
					'px !important; }';
			}

			window.addEventListener('scroll', throttle(stickSideCart, 200));

			setTimeout(function () {
				document.querySelector(
					'.header-main__search-wrapper .dgwt-wcas-search-wrapp'
				).style['animation-duration'] = '.4s';
			}, 500);
			const productForm = document.querySelector('.variations_form.cart');

			if (productForm) {
				const productSelect = productForm.querySelector('select#type');
				if (productSelect) {
					const productFormButton = productForm.querySelector(
						'.single_add_to_cart_button'
					);
					const googlePlayLink = document.createElement('a');
					googlePlayLink.href =
						'https://play.google.com/store/books/details/The_Van_Conversion_Bible_The_Ultimate_Guide_to_Con?id=egIrEAAAQBAJ';
					googlePlayLink.className = 'elementor-button button--ebook';
					googlePlayLink.style.textTransform = 'uppercase';
					googlePlayLink.style.marginLeft = '10px';
					googlePlayLink.textContent = 'Buy from Google Play';
					googlePlayLink.target = '_blank';

					function toggleAmazonBtn(onLoad) {
						if (!onLoad) {
							productFormButton.style.display = 'none';
						}
						const amazonLink = document.createElement('a');
						amazonLink.className = 'elementor-button button--ebook';
						amazonLink.style.textTransform = 'uppercase';
						amazonLink.style.marginLeft = '10px';
						amazonLink.textContent = 'Buy from Amazon';
						amazonLink.target = '_blank';
						if (!productForm.querySelector('.button--ebook')) {
							// if (window.CUSTOMER_LOCATION === 'america') {
							// 	amazonLink.href = 'https://www.amazon.com/dp/1800493983';
							// 	productFormButton.style.display = 'none';
							// 	productFormButton.parentNode.appendChild(amazonLink);
							// }
							if (window.CUSTOMER_LOCATION === 'canada') {
								amazonLink.href =
									'https://www.amazon.ca/Van-Conversion-Bible-Converting-Campervan/dp/1800493983';
								productFormButton.style.display = 'none';
								productFormButton.parentNode.appendChild(amazonLink);
							}
						}
					}

					toggleAmazonBtn(true);

					productSelect.addEventListener('change', function (e) {
						if (window.CUSTOMER_LOCATION === 'unknown') {
							return false;
						}
						if (e.target.value === 'Ebook') {
							if (window.CUSTOMER_LOCATION === 'europe') {
								productFormButton.parentNode.appendChild(googlePlayLink);
								productFormButton.style.display = 'none';
							} else {
								productFormButton.style.display = 'block';
								Array.from(
									productForm.querySelectorAll('.button--ebook')
								).forEach((button) => button.remove());
							}
						} else if (e.target.value === 'Hardback book') {
							toggleAmazonBtn();
							if (window.CUSTOMER_LOCATION === 'europe') {
								productFormButton.style.display = 'block';
								Array.from(
									productForm.querySelectorAll('.button--ebook')
								).forEach((button) => button.remove());
							}
						}
					});
				}
			}

			Array.from(
				document.querySelectorAll(
					'.header-main__nav > .header-main__nav-items > .header-main__nav-item, .header-main__nav > .header-main__nav-items > .header-main__nomadic'
				)
			).forEach(function (el, i) {
				if (!i) return;
				el.addEventListener(
					'mouseenter',
					throttle((e) => {
						document.body.classList.add('shade');
						document.querySelector('html').classList.add('shade');
					}, 100)
				);
				el.addEventListener(
					'mouseleave',
					throttle((e) => {
						if (searchOpen) {
							return false;
						}
						document.body.classList.remove('shade');
						document.querySelector('html').classList.remove('shade');
					}, 100)
				);
			});

			new ProductCarousels().init();
			new BlogCarousels().init();
			const ecologiImage = document.querySelector(
				'.header-main__ecologi-image'
			);
			if (ecologiImage) {
				fetch('https://public.ecologi.com/users/climbingvan/impact')
					.then((response) => response.json())
					.then((data) => {
						const text = document.createElement('div');

						text.innerHTML =
							`<span class="trees">${data.trees.toLocaleString()}</span>` +
							' trees planted';

						text.className = 'header-main__ecologi-image__text';

						ecologiImage.appendChild(text);
					});
			}
			const searchInputs = Array.from(
				document.querySelectorAll('.dgwt-wcas-search-input')
			);

			function handleSearchIcons(e) {
				if (e.target.value) {
					e.target.parentNode.classList.add('has-value');
				} else {
					e.target.parentNode.classList.remove('has-value');
				}
			}

			function handleEbookEU() {
				const euCountries = [
					'AT',
					'BE',
					'BG',
					'CZ',
					'CY',
					'DE',
					'DK',
					'EE',
					'ES',
					'FI',
					'FR',
					'GR',
					'HR',
					'HU',
					'IE',
					'IT',
					'LT',
					'LU',
					'LV',
					'MT',
					'NL',
					'PL',
					'PT',
					'RO',
					'SE',
					'SI',
					'SK',
				];
				if (
					euCountries.includes(jQuery('select[name=billing_country]').val())
				) {
					const hasEbookInCart = document.querySelector(
						'.product-name [alt*="ebook"]'
					);
					if (hasEbookInCart) {
						const removeLink =
							hasEbookInCart.parentNode.querySelector('#remove-link');
						location.href = removeLink.href + '&remove_ebook=1';
					}
				}
			}

			// handleEbookEU();
			jQuery(function ($) {
				$(document.body).on(
					'change',
					'select[name=billing_country]',
					handleEbookEU
				);
			});
			if (searchInputs.length) {
				searchInputs.forEach((input) =>
					input.addEventListener('input', handleSearchIcons)
				);
				searchInputs.forEach((input) =>
					input.addEventListener('blur', handleSearchIcons)
				);
			}

			const quantityInput = document.querySelector('.cart_item .qty');
			if (quantityInput) {
				quantityInput.addEventListener('blur', function (e) {
					if (innerWidth > 767) {
						return;
					}
					const button = e.target.parentNode.nextElementSibling;

					button.click();
				});
			}

			if (toastr) {
				toastr.options.timeOut = 10000; // How long the toast will display without user interaction
				toastr.options.extendedTimeOut = 10000; // How long the toast will display after a user hovers over it
			}

			const freeShippingInput = document.querySelector(
				'[value*="free_shipping"]'
			);
			if (
				document.querySelector('.woocommerce-checkout') &&
				freeShippingInput
			) {
				document.addEventListener('change', function (e) {
					if (
						e.target.matches('[value*="free_shipping"]') &&
						e.target.checked
					) {
						toastr.info(window.LOCALISED_VARS.checkoutPopup);
					}
				});
				if (
					freeShippingInput.checked ||
					(freeShippingInput &&
						document.getElementById('shipping_method').children.length < 2)
				) {
					toastr.info(window.LOCALISED_VARS.checkoutPopup);
				}
			}

			let menuOpen = false;
			let searchOpen = false;
			let cartOpen = false;

			function updateCartCount(quantity, replace = false) {
				const cartCounts = document.querySelectorAll('.cart-count');
				cartCounts.forEach(function (el) {
					const total = replace ? quantity : +el.textContent + quantity;
					el.textContent = total;
					if (!total) {
						el.classList.add('hide');
					} else {
						el.classList.remove('hide');
					}
				});
			}

			document.addEventListener('click', function (e) {
				const el = e.target;

				if (el.matches('.remove')) {
					const quantity =
						el.parentNode.previousElementSibling.querySelector('.qty');
					updateCartCount(-quantity.value);
				}
				if (el.matches('.xoo-wsc-smr-del')) {
					const quantity =
						el.parentNode.previousElementSibling.querySelector('.xoo-wsc-qty');
					updateCartCount(-quantity.value);
				}
				if (el.matches('[name="update_cart"]')) {
					const quantity = Array.from(
						document.querySelectorAll('.product-quantity .qty')
					).reduce(function (total, input) {
						return total + +input.value;
					}, 0);
					updateCartCount(quantity, true);
				}
				if (el.matches('.single_add_to_cart_button')) {
					const quantity = el.previousElementSibling.querySelector('.qty');

					updateCartCount(+quantity.value);
				}

				if (el.matches('.xoo-wsc-opac')) {
					document
						.querySelector('.xoo-wsch-close')
						.click('.xoo-wsc-cart-trigger');
				}

				if (
					el.matches('.xoo-wsc-cart-trigger') ||
					(el.parentNode && el.parentNode.matches('.xoo-wsc-cart-trigger'))
				) {
					if (cartOpen) {
						document.querySelector('.xoo-wsch-close').click();
					}
					cartOpen = !cartOpen;
					if (cartOpen) {
						return stickSideCart();
					}
				}

				if (el.matches('.header-main__search')) {
					document.body.classList.toggle('shade');
					document.querySelector('html').classList.toggle('shade');
					document
						.querySelector('.header-main__search-mobile-wrapper input')
						.focus();
				}
				if (el.matches('.header-main__search-btn')) {
					document
						.querySelector('.header-main__nomadic')
						.classList.toggle('hidden');
					document.body.classList.toggle('shade');
					document.querySelector('html').classList.toggle('shade');

					document
						.querySelector('.header-main__search-wrapper')
						.classList.toggle('open');

					if (el.previousElementSibling.className.indexOf('open') > -1) {
						searchOpen = true;
						document
							.querySelector('.header-main__search-wrapper input')
							.focus();
						document.body.classList.add('search-open');
					} else {
						searchOpen = false;
						document.body.classList.remove('search-open');
					}
				}

				if (el.matches('#main-search')) {
					document
						.querySelector('.header-main__search-mobile-wrapper')
						.classList.toggle('open');

					if (
						document
							.querySelector('.header-main__search-mobile-wrapper')
							.className.indexOf('open') > -1
					) {
						document.body.classList.add('search-open');

						searchOpen = true;
					} else {
						document.querySelector('.dgwt-wcas-close').click();
						document.body.classList.add('search-open');
						searchOpen = false;
					}
				}

				if (
					el.matches('.badge__link') ||
					el.matches('[href^="https://www.cusrev.com/reviews]')
				) {
					e.preventDefault();
					return;
				}

				if (el.matches('.widgettitle')) {
					el.parentNode.classList.toggle('closed');
					el.classList.toggle('closed');
					if (el.className.indexOf('closed') > -1) {
						el.nextElementSibling.style.display = 'none';
					} else {
						el.nextElementSibling.style.display = 'block';
					}
				}

				if (el.matches('#btn-filter')) {
					const filters = document.querySelector('.category-filters');
					if (innerWidth < 992) {
						filters.classList.toggle('show');

						if (filters.className.indexOf('show') > -1) {
							el.textContent = 'Close';
						} else {
							el.textContent = 'Filter';
						}
					}
				}

				if (el.matches('[data-filter]')) {
					const products = document.querySelector('.products');
					const filters = document.querySelector('.category-filters');
					products.innerHTML = '';

					if (innerWidth < 992) {
						filters.classList.remove('show');
						document.querySelector('#btn-filter').textContent = 'Filters';
					}
				}

				if (el.matches('.fa-bars')) {
					menuOpen = !menuOpen;
					jQuery('.header-main__nav').toggleClass('show');

					document.body.classList.toggle('shade');
					document.querySelector('html').classList.toggle('shade');

					const shopNav = document.querySelector(
						'.header-main__nav-items--shop'
					);

					const mainNav = document.querySelector(
						'.header-main__nav-items:first-of-type'
					);
					shopNav.style.top = mainNav.getBoundingClientRect().height + 'px';
					shopNav.style.transition = 'top 0s ease-in-out';
					setTimeout(function () {
						shopNav.style.transition = 'top 0.3s ease-in-out';
					}, 50);
				}

				const isLinkChevron =
					el.matches('.fa-chevron-down') &&
					el.parentNode.matches('.header-main__nav-link');

				if (el.matches('.header-main__nav-link') || isLinkChevron) {
					if (innerWidth >= 992) {
						return;
					}

					const element = isLinkChevron ? el.parentNode : el;

					if (
						!element.nextElementSibling ||
						element.matches('.header-main__nav-item--parent')
					) {
						return;
					}

					if (
						element.matches('.header-main__nav-link--book-large') ||
						element.matches('.header-main__nav-link--list')
					) {
						return;
					}

					e.preventDefault();
					const subNav = element.nextElementSibling;
					subNav.classList.add('active');

					const backLink = document.createElement('button');
					backLink.setAttribute(
						'data-shop-btn',
						element.matches('.header-main__nav-link--shop')
					);
					backLink.textContent = 'Back';
					backLink.className = 'header-main__back';

					const icon = document.createElement('i');
					icon.className = 'fas fa-chevron-down';

					backLink.prepend(icon);
					subNav.append(backLink);

					if (!element.matches('.header-main__nav-link--book-large')) {
						const navItem = subNav.previousElementSibling.cloneNode(true);
						navItem.classList.add('header-main__nav-item--parent');

						subNav.prepend(navItem);
					}

					if (element.matches('.header-main__nav-link--shop')) {
						return;
					}

					const mainNav = document.querySelector(
						'.header-main__nav-items:first-of-type'
					);
					mainNav.style.height =
						backLink.getBoundingClientRect().height +
						backLink.getBoundingClientRect().top +
						'px';
					const shopNav = document.querySelector(
						'.header-main__nav-items--shop'
					);
					shopNav.style.top = `calc(${
						backLink.getBoundingClientRect().height +
						backLink.getBoundingClientRect().top +
						'px'
					} - 2rem)`;
				}
				if (el.matches('.header-main__back')) {
					if (innerWidth >= 992) {
						return;
					}

					e.preventDefault();
					const subNav = el.parentNode;
					subNav.classList.remove('active');
					const parentNavItem = subNav.querySelector(
						'.header-main__nav-item--parent'
					);
					if (parentNavItem) {
						parentNavItem.remove();
					}

					const previousList = el.parentNode.parentNode.parentNode;
					const lastItem = Array.from(previousList.children).pop();

					el.remove();

					if (el.getAttribute('data-shop-btn') === 'true') {
						return;
					}

					const mainNav = document.querySelector(
						'.header-main__nav-items:first-of-type'
					);

					mainNav.style.height =
						lastItem.getBoundingClientRect().height +
						lastItem.getBoundingClientRect().top +
						'px';
					const shopNav = document.querySelector(
						'.header-main__nav-items--shop'
					);

					shopNav.style.top = `calc(${
						lastItem.getBoundingClientRect().height +
						lastItem.getBoundingClientRect().top +
						'px'
					} - 2rem)`;
				}

				if (menuOpen && el.matches('body')) {
					document.body.classList.remove('shade');
					document.querySelector('html').classList.remove('shade');
					document.querySelector('.header-main__nav').classList.remove('show');
					menuOpen = false;
				}
				if (searchOpen && el.matches('body')) {
					if (innerWidth >= 992) {
						document.querySelector('.header-main__search-btn').click();
					} else {
						document.querySelector('.header-main__search').click();
					}
					searchOpen = false;
				}
			});

			const filterSidebar = document.querySelector(
				'.category-filters .elementor-column-wrap'
			);
			const footer = document.querySelector('[data-elementor-type="footer"]');

			if (filterSidebar) {
				function getStickyHeights() {
					return Array.from(
						document.querySelectorAll('.header-main__nav-items--shop')
					).reduce(function (total, el) {
						return total + el.offsetHeight;
					}, 0);
				}
				let stickyHeights = getStickyHeights();

				let isSticky = false;

				const categoryTitle = filterSidebar.querySelector('.category-title');

				function stickyFilters() {
					if (innerWidth < 992) {
						return false;
					}
					stickyHeights = getStickyHeights();

					const filterRect = filterSidebar.getBoundingClientRect();

					filterSidebar.style.height = `calc(100vh - ${stickyHeights}px)`;

					if (
						filterRect.top + categoryTitle.getBoundingClientRect().height <=
						stickyHeights
					) {
						if (isSticky) {
							return;
						}
						isSticky = true;
						filterSidebar.style.position = 'sticky';
						filterSidebar.style.top = stickyHeights + 'px';
						filterSidebar.classList.add('sticky');
						categoryTitle.style.display = 'none';
					} else {
						categoryTitle.style.display = 'block';

						if (!isSticky) {
							return;
						}
						isSticky = false;
						filterSidebar.style.position = 'static';
						filterSidebar.classList.remove('sticky');
					}
				}

				stickyFilters();

				window.addEventListener('scroll', throttle(stickyFilters, 50));
			}

			const products = document.querySelector('.products');
			const helpBanner = document.querySelector('.help-banner');

			if (products && !document.querySelector('.category-description')) {
				if (innerWidth > 992) {
					const productsWrapper = document.querySelector('.products-wrapper');
					const elementorProductsWrapper = document.querySelector(
						'.post-type-archive-product .elementor-widget-woocommerce-products'
					);
					if (elementorProductsWrapper) {
						elementorProductsWrapper.style.marginTop = '-20px';
					}
					if (productsWrapper) {
						document.querySelector('.products-wrapper').style.marginTop = '0';
					}
				}
			}
			if (products && helpBanner) {
				let productIndex = 12;
				let loading = false;

				let showingHelpBanner = false;
				products.style['grid-row-gap'] = 0;

				function loadProducts() {
					if (showingHelpBanner) {
						return false;
					}
					if (productIndex > products.children.length) {
						showingHelpBanner = true;
						helpBanner.style.opacity = 1;
						return false;
					}
					if (
						!loading &&
						window.pageYOffset >
							document.documentElement.scrollHeight -
								window.innerHeight -
								footer.clientHeight -
								300
					) {
						loading = true;

						productIndex += 12;

						Array.from(products.children)
							.slice(0, productIndex)
							.forEach(function (product) {
								product.classList.add('show');
							});

						loading = false; // reset value of loading once content loaded
					}
				}
				window.addEventListener('scroll', throttle(loadProducts, 200));
			}

			
		},
		false
	);
})();

jQuery(document).ready(function($) {
	var activeMenu = null;
	var activeSubMenu = null;
	var ignoreClassesClicked = [
		'subnavigation-categories',
		'subnavigation-category',
		'header-subnavigation',
		'header-main__nav-items',
		'header-main__nav-item',
		'header-main__nav-link',
		'header-main',
		'header-navigation',
		'main-navigation-item'
	];
	var mobileMenuOpen = false;
	var initialWindowWidth = $(window).outerWidth();

	function ClassClickedCanBeIgnored(target) {
		for(var i = 0; i < ignoreClassesClicked.length; i ++) {
			if($(target).hasClass(ignoreClassesClicked[i])) {
				return false;
			}
		} 

		return true;
	}

	function displayShopSubMenuIfHomepage() {
		var pathName = window.location.pathname;

		if ((pathName == '/' || pathName.indexOf("product") > -1 || pathName.indexOf("product-category") > -1) && initialWindowWidth > 991) {
			var shopLink = $('.main-navigation a.shop-menu-link');

			shopLink.addClass("active");
			shopLink.parent('li').addClass("active");
			$("#vanLifeMenu").addClass("hide");
			$("#vanConversionMenu").addClass("hide");
			$(".header-subnavigation").removeClass('hide');
			$("#shopMenu").removeClass("hide");
			$("[data-elementor-type='header']").addClass("menu-spacer");

			activeMenu = shopLink;
		}
	}

	$(window).click(function (e) {
		if(activeMenu == null && activeSubMenu == null) {
			return;
		}

		var target = $(e.target);
		var targetClassCanBeIgnored = ClassClickedCanBeIgnored(target);

		if((activeMenu && target[0] != activeMenu[0]) && (activeSubMenu && target[0] != activeSubMenu[0]) && targetClassCanBeIgnored) {
			$('.header-subnavigation').addClass('hide');
			$("[data-elementor-type='header']").removeClass("menu-spacer");
			$(activeSubMenu).siblings("ul").hide();
			$(activeSubMenu).siblings(".book-large").hide();
			activeMenu = null;
			activeSubMenu = null;
			$('.main-navigation li').removeClass("active");
			$(".subnavigation-categories").addClass("hide");
			$(".header-main__nomadic-ad").addClass("hide");
			$(".main-navigation a").removeClass("active");
		}

		if(activeMenu != null && activeSubMenu == null && targetClassCanBeIgnored) {
			if(target[0] != activeMenu[0]) {
				$('.header-subnavigation').addClass('hide');
				$('.main-navigation li').removeClass("active");
				$(".main-navigation a").removeClass("active");
				$("[data-elementor-type='header']").removeClass("menu-spacer");
				activeMenu = null;
			}
		}

		if(activeSubMenu != null && targetClassCanBeIgnored) {
			if(target[0] != activeSubMenu[0]) {
				$(activeSubMenu).siblings("ul").hide();
				activeSubMenu = null;
			}
		}
	});

	$('.main-navigation a').hover(function (e) {
		$('.main-navigation li').removeClass("active");
		$(".main-navigation a").removeClass("active");
		$(".header-subnavigation").addClass('hide');
		$(this).addClass("active");
		$("#shopMenu").addClass("hide");
		$("#vanLifeMenu").addClass("hide");
		$("#vanConversionMenu").addClass("hide");

		if($(this).hasClass("shop-menu-link")) {
			e.preventDefault();

			$(this).parent('li').addClass("active");
			$(".header-subnavigation").removeClass('hide');
			$("#shopMenu").removeClass("hide");
			$(".header-main__nomadic-ad").addClass("hide");
			$("[data-elementor-type='header']").addClass("menu-spacer");

			
		}

		if($(this).hasClass("nomadic-energy-link")) {
			e.preventDefault();

			$(this).parent('li').addClass("active");
			$(".header-subnavigation").removeClass('hide');
			$(".subnavigation-categories").addClass("hide");
			$(".header-main__nomadic-ad").removeClass("hide");
		}

		if($(this).hasClass("van-conversion-menu-link")) {
			e.preventDefault();

			$(this).parent('li').addClass("active");
			$(".header-subnavigation").removeClass('hide');
			$(".subnavigation-categories").addClass("hide");
			$("#vanConversionMenu").removeClass("hide");
			$(".header-main__nomadic-ad").addClass("hide");
		}

		if($(this).hasClass("van-life-menu-link")) {
			e.preventDefault();

			$(this).parent('li').addClass("active");
			$(".header-subnavigation").removeClass('hide');
			$(".subnavigation-categories").addClass("hide");
			$("#vanLifeMenu").removeClass("hide");
			$(".header-main__nomadic-ad").addClass("hide");
		}

		activeMenu = $(this);
	});

	$('.header-subnavigation .subnavigation-link').hover(function (e) {
		e.preventDefault();

		if(activeSubMenu != null) {
			$(activeSubMenu).siblings("ul").hide();
			$(activeSubMenu).siblings(".book-large").hide();
		}

		if($(this).hasClass('header-main__nav-link--book-large')) {
			$(this).siblings(".book-large").css('display', 'block');
		} else {
			$(this).siblings("ul").css('display', 'flex');

		}
		activeSubMenu = $(this);
	});

	$('.menu-switcher').click(function (e) {
		e.preventDefault();
		var target = $(".header-navigation > .center-navigation > .search-bar");
		var isHidden = target.hasClass("hide");

		if($(window).outerWidth() < 992) {
			$('.main-menu > .header-main__search-mobile-wrapper').toggleClass('open');
		} else {

			if(isHidden) {
				target.removeClass("hide");
				$('.main-navigation').addClass("hide");
				$('.main-navigation li').removeClass("active");
				$(this).removeClass("menu-mode").addClass("search-mode");
				
			} else {
				target.addClass("hide");
				$(".main-navigation").removeClass("hide");
				$(this).removeClass("search-mode").addClass("menu-mode");

				setTimeout(function() {
					displayShopSubMenuIfHomepage();
				}, 100);
			}
		}
		//$(".header-navigation > .search-bar").removeClass('hide');
	});

	$('.mobile-menu-icon').click(function () {
		mobileMenuOpen = ! mobileMenuOpen;

		if(mobileMenuOpen) {
			$('.mobile-navigation').addClass("show");
			$('.main-menu > .header-main__search-mobile-wrapper').removeClass('open');
		} else {
			$('.mobile-navigation').removeClass("show");
			$('.main-menu > .header-main__search-mobile-wrapper').removeClass('open');
		}
	});

	function showMobileNavigationIfMobileWidth() {
		var width = $(window).outerWidth();

		if(width > 991 && mobileMenuOpen) {
			mobileMenuOpen = false;
			$('.mobile-navigation').removeClass("show");
		}

		if(width < 992 && activeMenu) {
			$('.header-subnavigation').addClass('hide');
			$(activeSubMenu).siblings("ul").hide();
			$(activeSubMenu).siblings(".book-large").hide();
			activeMenu = null;
			activeSubMenu = null;
			$('.main-navigation li').removeClass("active");
			$(".subnavigation-categories").addClass("hide");
			$(".header-main__nomadic-ad").addClass("hide");
			$(".main-navigation a").removeClass("active");
		}

		if(width < 992 & $('.menu-switcher').hasClass("search-mode")) {
			$(".header-navigation > .center-navigation > .search-bar").addClass('hide');
			$('.menu-switcher').removeClass("search-mode").addClass("menu-mode");
		}
	}

	$(window).resize(function () {
		showMobileNavigationIfMobileWidth();
	});

	// If on homepage show shop subcategory
	displayShopSubMenuIfHomepage();

	$("input#keywordSearch").keyup(function() {
		if($(this).val().length == 0) {
			$('.header-navigation .search-bar .close').hide();
			$('.header-navigation .search-bar .search').replaceWith('<i class="fas fa-search search"></i>');
		} else {
			$('.header-navigation .search-bar .close').show();

			if($('.header-navigation .search-bar .search').hasClass('fa-spin')) {
				$('.header-navigation .search-bar .search').replaceWith('<i class="fas fa-search search"></i>');
			}
		}
		/*if ($(this).val().length > 2) {
			
			var valThis = this.value.toLowerCase();
			var length = this.value.length;

			$('.objType').each(function () {
		        var text  = $(this).text(),
		            textL = text.toLowerCase(),
		            textStart = textL.indexOf(valThis),
		            textEnd = textStart+valThis.length;
		            //n = textL.indexOf(valThis);
		         var htmlR = text.substring(0,textStart)+'<b>' + text.substring(textStart,textEnd) + '</b>' + text.substring(textStart+length);
		        
		        if(textStart!=-1) {
		          $("#"+this.id+"r").html(htmlR).show()
		        	$(this).hide();
		        }
		        else {
		         $("#"+this.id+"r").empty();
		        	$(this).hide();
		        }
		    });
		} else {
			$("#datafetch").hide();
		}*/

		//$('#datafetch').empty();

    });

    $('.header-navigation .search-bar .close').hide();

    /*$('.header-navigation .search-bar .close').click(function() {
    	$('input#keywordSearch').val('');
    	$('#datafetch').hide().empty();
    	$(this).hide();
    	$('.header-navigation .search-bar .search').replaceWith('<i class="fas fa-search search"></i>');
    }); */
});
