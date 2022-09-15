<?php
require_once __DIR__ . '/vendor/autoload.php';

use WPackio\Enqueue;

/**
 * Theme functions and definitions
 *
 * @package HelloElementorChild
 */

/**
 * Load child theme css and optional scripts
 *
 * @return void
 */

// add_action( 'wp_head', function() {
// 	global $wp_scripts;
// 	echo '<pre>';
// 	foreach($wp_scripts->registered as $script) {
// 		echo $script->handle;
// 		echo '<br />';
// 	}
// 	exit;
// 			// $enqueued_scripts[] = $wp_scripts->registered[$handle]->src;
// });

function hello_elementor_child_enqueue_scripts() {
	// wp_register_script('script-handle', plugins_url('js/script.js'  , __FILE__ ),'','1.0',true)

	$enqueue = new Enqueue( 'climbingvan', 'dist', '1.0.0', 'theme', false, 'child');

	$enqueue->enqueue('main', 'main', [] );

	$country_code = isset($_SERVER["HTTP_CF_IPCOUNTRY"]) ? $_SERVER["HTTP_CF_IPCOUNTRY"] : 'US';
	$europe = array('AT', 'BE', 'BG', 'CZ', 'CY', 'DE', 'DK', 'EE', 'ES', 'FI',  'FR', 'GR', 'HR', 'HU', 'IE',  'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK',);
	if(in_array($country_code, $europe)) {
		echo '<script>
			window.CUSTOMER_LOCATION = "europe";
		</script>';
	} else if ($country_code === 'US') {
		echo '<script>
		window.CUSTOMER_LOCATION = "america";
	</script>';
	} else if ($country_code === 'CA') {
		echo '<script>
		window.CUSTOMER_LOCATION = "canada";
	</script>';
	}else {
		echo '<script>
		window.CUSTOMER_LOCATION = "unknown";
	</script>';
	}

	echo '<script>
		window.LOCALISED_VARS = {
			checkoutPopup: "'.get_field('checkout_pop-up_text', 'options').'"
		};
	</script>';

	// Enqueue a few of our entry points
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts', 20 );

add_action( 'wp_footer', function() {
	wp_enqueue_style( 'dashicons' );

	wp_enqueue_style(
		'toasts-style',
		'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css',
	);
	wp_enqueue_style(
		'slick-style',
		get_stylesheet_directory_uri() . '/src/slick-1.8.1/slick/slick.css',
	);
	wp_enqueue_style(
		'slick-theme-style',
		get_stylesheet_directory_uri() . '/src/slick-1.8.1/slick/slick-theme.css',
	);
} );

function prefix_add_footer_styles() {
	wp_enqueue_script(
		'slick-js',
		get_stylesheet_directory_uri() . '/src/slick-1.8.1/slick/slick.min.js',
		[],
		false,
		true
	);

	wp_enqueue_script(
		'toasts',
		'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js',
		[],
		false,
		true
	);
};
add_action( 'get_footer', 'prefix_add_footer_styles' );

function wpb_modify_jquery() {
	//check if front-end is being viewed
	if (!is_admin()) {
			wp_deregister_script('jquery');
			wp_register_script('jquery', 'https://code.jquery.com/jquery-3.6.0.min.js', false, '3.6.0');
			wp_enqueue_script('jquery');
	}
}

// Execute the action when WordPress is initialized
// add_action('init', 'wpb_modify_jquery');


add_filter( 'loop_shop_per_page', function ( $cols ) {
	// Increase number of products to allow for infinite scroll
  $cols = 1000000;

	return $cols;
}, 20 );


add_filter( 'woocommerce_get_breadcrumb', function ( $crumbs ) {
	$newCrumbs = [];

	foreach($crumbs as $crumb) {
		if (in_array($crumb[0], ['Climbingvan store', 'Home'])) {
			continue;
		}
		if (preg_match("/Page [0-9]/", $crumb[0])) {
			continue;
		}
		if (preg_match("/Search results/", $crumb[0])) {
			$crumb[0] = 'Search results';
		}

		$newCrumbs[] = $crumb;
	}

	return $newCrumbs;
} );

function buildTree(array &$flatNav, $parentId = 0) {
	$branch = [];

	foreach ($flatNav as &$navItem) {
		if($navItem->menu_item_parent == $parentId) {
			$children = buildTree($flatNav, $navItem->ID);
			if($children) {
				$navItem->children = $children;
			}

			$branch[$navItem->menu_order] = $navItem;
			unset($navItem);
		}
	}

	return $branch;
}

function createSubMenu($navItem, $class_prefix = 'header-main', $shopMenu = false) { ?>
	<?php $parentType = get_field('content_type', $navItem); ?>
	<?php if(get_field('content_type', $navItem) === 'book-large'): ?>
		<div class="book-large">
			<div class="book-large__container">
				<div class="book-large__content">
					<h3 class="book-large__title"><?php the_field('info_title', $navItem); ?></h3>
					<p class="book-large__description"><?php the_field('info_text', $navItem); ?></p>
					<?php echo do_shortcode('[cusrev_trustbadge type="VSD" color="transparent"]'); ?>
					<!-- Shortcode has a stray div so add close here -->
					<a href="/product/the-van-conversion-bible/" class="book-large__link">
						Buy your copy
					</a>
				</div>
				<div class="book-large__image">
					<?php echo wp_get_attachment_image( get_field('info_image', $navItem), 'medium'); ?>
				</div>
				<div class="book-large__video">
					<img src="<?php echo get_stylesheet_directory_uri() . '/src/assets/book.gif'; ?>" alt="">
				</div>
			</div>
		</div>
	<?php endif; ?>
	<?php if(isset($navItem->children)): ?>
		<?php $hasLeftAd = array_reduce($navItem->children, function($bool, $child) {
			$type = get_field('content_type', $child);

			if ($type === 'book') {
				return true;
			}

			return $bool;

		}, false); ?>
		<?php $hasRightAd = array_reduce($navItem->children, function($bool, $child) {
			$type = get_field('content_type', $child);

			if (in_array($type, ['image-text', 'ecologi'])) {
				return true;
			}

			return $bool;

		}, false); ?>
		<ul class="<?php echo $class_prefix; ?>__nav-items <?php echo "{$class_prefix}__nav-items--" . count($navItem->children); ?> <?php echo $hasLeftAd ? "{$class_prefix}__nav-items--left-ad" : '' ?> <?php echo $hasRightAd ? "{$class_prefix}__nav-items--right-ad" : '' ?>" >

			<?php foreach ($navItem->children as $child): ?>
			    <?php $type = get_field('content_type', $child); ?>
				<li class="<?php echo $class_prefix; ?>__nav-item <?php echo $class_prefix; ?>__nav-item--<?php the_field('content_type', $child) ?>">
					<?php if (in_array($type, ['book', 'image-text'])): ?>
						<div class="<?php echo $class_prefix; ?>__nav-advert-wrapper">
							<?php if ($type === 'book') : ?>
								<a href="<?php echo $child->url; ?>">
							<?php endif; ?>
							<?php echo wp_get_attachment_image( get_field('info_image', $child), 'xl'); ?>
							<?php if ($type === 'book') : ?>
								</a>
							<?php endif; ?>
							<h2><?php the_field('info_title', $child); ?></h2>
							<?php if (get_field('info_text', $child)): ?>
								<p><?php the_field('info_text', $child); ?></p>
							<?php endif; ?>
							<a href="<?php echo $child->url; ?>"><?php echo $child->title; ?></a>
						</div>
					<?php elseif ($type === 'ecologi'): ?>
						<div class="<?php echo $class_prefix; ?>__nav-advert-wrapper">
							<div class="<?php echo $class_prefix; ?>__ecologi-image">
								<?php echo wp_get_attachment_image( get_field('info_image', $child), 'xl'); ?>
							</div>
							<h2><?php the_field('info_title', $child); ?></h2>
							<p><?php the_field('info_text', $child); ?></p>
							<a  href="<?php echo $child->url; ?>"><?php echo $child->title; ?></a>
						</div>
					<?php elseif ($parentType === 'list'): ?>
						<div class="header-main__nav-list-item"><?php echo $child->title; ?></div>
					<?php else: ?>
						<a class="<?php echo $class_prefix; ?>__nav-link <?php echo $class_prefix; ?>__nav-link--<?php the_field('content_type', $child) ?> <?php echo $shopMenu ? "{$class_prefix}__nav-link--shop" : '' ?>" href="<?php echo $child->url; ?>">
							<?php if (get_field('menu_item_icon', $child)): ?>
								<img class="header-main__nav-link__icon" src="<?php echo get_field('menu_item_icon', $child)['url'] ?>" alt="<?php echo $child->title; ?>">
							<?php endif; ?>
							<?php echo $child->title; ?>
<!-- 							<i class="fas fa-chevron-down"></i> -->
						</a>
						<?php if (isset($child->children)): ?>
							<?php createSubMenu($child); ?>
						<?php endif; ?>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif;
}

add_action( 'after_setup_theme', function() {
	register_nav_menus( [ 'shop' => __( 'Yellow menu', 'hello-theme-child' ) ] );
} );


add_action('elementor/preview/enqueue_styles', function() {
	$enqueue = new Enqueue( 'climbingvan', 'dist', '1.0.0', 'theme', false, 'child');

	$enqueue->enqueue('main', 'main', [] );
});


add_action('acf/init', 'my_acf_op_init');
function my_acf_op_init() {
    // Check function exists.
    if( function_exists('acf_add_options_page') ) {
        // Register options page.
        $option_page = acf_add_options_page(array(
            'page_title'    => __('Website Settings'),
            'menu_title'    => __('Website Settings'),
            'menu_slug'     => 'general-settings',
            'capability'    => 'edit_posts',
            'redirect'      => false
        ));
    }
}

/**
 * Set WooCommerce image dimensions upon theme activation
 */
// Remove each style one by one
add_filter( 'woocommerce_enqueue_styles', 'jk_dequeue_styles' );
function jk_dequeue_styles( $enqueue_styles ) {
	unset( $enqueue_styles['woocommerce-smallscreen'] );
		// Remove the smallscreen optimisation
	return $enqueue_styles;
}

add_filter( 'wc_add_to_cart_message_html', '__return_false' );


add_filter( 'woocommerce_product_tabs', 'datasheets' );

function datasheets( $tabs ) {

	if (!empty(get_field('datasheets'))) {

		$tabs['datasheets'] = array(
			'title'    => 'Datasheets',
			'callback' => 'datasheets_content', // the function name, which is on line 15
			'priority' => 50,
		);

	}

	return $tabs;

}

function datasheets_content( $slug, $tab ) {
	global $product;
?>
	<ul class="datasheets">
		<?php foreach(get_field('datasheets') as $sheet) : $file = $sheet['file']; ?>
			<li>
				<a class="datasheets__link" target="_blank" href="<?php echo $file['url']; ?>"><?php echo $file['title']; ?></a>
			</li>
		<?php endforeach; ?>
	</ul>
<?php }

// Disable the country restrictions plugin on the book product page only so we can show e-book buttons
add_action('woocommerce_init', function() {
	$post_slug = $_SERVER['REQUEST_URI'];
	if (preg_match("/product\/the-van-conversion-bible/", $post_slug )) {
		remove_all_filters( 'woocommerce_available_variation', 10 );
	}
});

function js_async_attr($tag, $handle, $script){
	if (is_admin()) {
		return $tag;
	}
	return str_replace( ' src', ' defer="defer" src', $tag );
}
add_filter( 'script_loader_tag', 'js_async_attr', 10, 3, );

function defer_css($src, $handle) {
	if (in_array($handle, ["hello-elementor", "hello-elementor-theme-style", "elementor-frontend"]) || preg_match("/wpackio/", $handle)) {
		return $src;
	}
	return str_replace("type='text/css'", "type='text/css' media=\"none\" onload=\"if(media!=='all')media='all'\"", $src);
}
// add_filter('style_loader_tag', 'defer_css', 10, 2);

add_filter( 'comment_form_default_fields', 'amend_comment_form_fields' );
function amend_comment_form_fields( $fields ) {
	unset( $fields['cookies'] );
	return $fields;
}

add_filter('comment_form_defaults', 'comment_title', 20);
function comment_title( $defaults ){
 $defaults['title_reply'] = 'Leave a comment';
 return $defaults;
}

function filter_wpseo_breadcrumb_separator($this_options_breadcrumbs_sep) {
	return '/';
};

// add the filter
add_filter('wpseo_breadcrumb_separator', 'filter_wpseo_breadcrumb_separator', 10, 1);

add_filter( 'get_the_archive_title', function ($title) {
	if (is_archive()) {
		var_dump($title);
	}
	return $title;
});

// add klarna image next to add to cart button on product page
add_action( 'woocommerce_after_add_to_cart_button', 'add_klarna_notice_to_product_page', 20 );
 
function add_klarna_notice_to_product_page() {
    echo '<div id="productKlarnaNotice"><img src="http://site.climbingvan/wp-content/uploads/2022/08/pay-later-with-Klarna-01.png" alt="Pay later with Klarna" /></div>';
}

// Search ajax fetch Javascript
add_action( 'wp_footer', 'search_ajax_fetch' );
function search_ajax_fetch() {
?>
<script type="text/javascript">
	var typingTimer;
	var doneTypingInterval = 500;
	var currentAjaxRequest;

	function resetKeywordSearchTimer() {
		clearTimeout(typingTimer);
	}

	function startSearchByKeyword() {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(fetchSearchResults, doneTypingInterval);
	}

	function closeSearchWindow() {
		document.getElementById("keywordSearch").value = "";
		var searchResults = document.getElementById('datafetch');
		searchResults.style.display = 'none';
		searchResults.innerHTML = '';

		var searchIcon = document.querySelector('.center-navigation > .search-bar > .search');
		searchIcon.className = 'fas fa-search search';

		document.querySelector('.center-navigation > .search-bar > .close').style.display = 'none';

		if(currentAjaxRequest != null) {
			currentAjaxRequest.abort();
		}

    	//$('.header-navigation .search-bar .search').replaceWith('<i class="fas fa-search search"></i>');
	}

	function fetchSearchResults() {
		if(currentAjaxRequest != null) {
			currentAjaxRequest.abort();
		}

	    currentAjaxRequest = jQuery.ajax({
	        url: '<?php echo admin_url('admin-ajax.php'); ?>',
	        type: 'post',
	        data: { 
				action: 'data_fetch', 
				keyword: jQuery('#keywordSearch').val() 
			},
			beforeSend: function () {
				jQuery('.header-navigation .search-bar .search').replaceWith('<i class="fas fa-circle-notch fa-spin search"></i>');
			},
	        success: function(data) {
	        	jQuery('.header-navigation .search-bar .search').replaceWith('<i class="fas fa-search search"></i>');
	            jQuery('#datafetch').html( data ).css('display', 'flex');
	            //jQuery("#datafetch").css('display', 'flex');
	        }
	    });
	}

</script>

<?php
}

// The search ajax function
add_action('wp_ajax_data_fetch' , 'search_data_fetch');
add_action('wp_ajax_nopriv_data_fetch','search_data_fetch');

function acf_replace_repeater_field($where) {
     $where = str_replace("meta_key = 'articletags_$", "meta_key LIKE 'articletags_%", $where);
     return $where;
}

add_filter('posts_where', 'acf_replace_repeater_field');

function search_data_fetch() {
	$keyword =   esc_attr($_POST['keyword']);
	$categories = get_terms([
		'taxonomy'  => 'product_cat',
	    'name__like'    => $keyword,
	    'fields' => 'all'
	]);

	echo '<div class="first-column">';

	if(count($categories) > 0) {
		echo '<div class="categories">';
		echo '<h4>Categories</h4>';
		echo '<ul>';

		foreach($categories as $category) {
			$baseParent = null;
			$childParent = null;

			if($category->parent) {
				$childParent = get_term($category->parent, 'product_cat');

				if($childParent != null) {
					$baseParent = get_term($childParent->parent, 'product_cat');
				}
			}

			echo '<li>';
			echo '<a href="' . get_term_link($category) . '">' . $category->name . '</a>';
			echo '<p>in ' . ($baseParent->name != null ? ($baseParent->name . ' > ') : null)  . ($childParent->name != null ? $childParent->name : null) . '</p>';
			echo '</li>';
		}
		echo '</ul>';
		echo '</div>';
	}


	$productIndex = 0;
	$products = new WP_Query([
	    'post_type'             => 'product',
	    'post_status'           => 'publish',
	    'posts_per_page'        => '12',
	    's' => $keyword,
	]);

	if($products->have_posts()) {
		echo '<div class="products">';
		echo '<h4>Products</h4>';
		echo '<ul>';

		while($products->have_posts()) {
			if($productIndex < 3) {
				$products->the_post();
				$product = wc_get_product(get_the_ID());
				$imageUrl = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'full')[0];
				echo '<li>';
				echo '<div class="image-wrapper"><a href="' . $product->get_permalink() . '" class="featured-image" style="background-image: url(' . $imageUrl . ')"></a></div>';
				echo '<div class="text-wrapper"><a href="' . $product->get_permalink() . '">' . get_the_title() . '</a><p><strong>' . $product->get_price_html() . '</strong></p>' . '</div></li>';

				$productIndex++;
			} else {
				break;
			}
		}

		wp_reset_postdata();

		echo '</ul>';
		echo '<a href="/?s=' . $keyword . '&post_type=product" class="see-all">See all products (' . $products->found_posts . ')...</a>';
		echo '</div>';
	}

	// Closes .first-column
	echo '</div>';

	/*$articles = get_posts([
		'post_type' => [
			'post', 
			'page'
		],
		'meta_query' => [
			[
				'key' => 'articletags_$_articletag',
               	'value' => $keyword,
               	'compare' => '='
			]
		],
		'tax_query' => [
			[
				'taxonomy' => 'post_tag',
				'field' => 'name',
				'terms' => $keyword
			]
		],
		's' => $keyword,
	]);*/

	$articleQuery = new WP_Query([
		'post_type' => [
			'post',
			'page'
		],
		/*'meta_query' => [
			[
				'key' => 'articletags_$_articletag',
				'value' => $keyword,
				'compare' => '='
			]	
		]*/
		'tax_query' => [
			[
				'taxonomy' => 'post_tag',
				'field' => 'name',
				'terms' => $keyword
			]
		],
	]);

	if(! $articleQuery->found_posts) {
		$articleQuery = new WP_Query([
			'post_type' => [
				'post',
				'page'
			],
			's' => $keyword
		]);
	}

	echo '<div class="second-column">';
	
	if($articleQuery->have_posts()) {
		$index = 0;
		
		echo '<div class="articles">';
		echo '<h4>Articles</h4>';
		echo '<ul>';

		while($articleQuery->have_posts()) {
			$articleQuery->the_post();

			if($index < 2) {
				$imageUrl = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'full')[0];
				echo '<li>';
				echo '<a href="' . get_permalink(get_the_ID()) . '" class="featured-image" style="background-image: url(' . $imageUrl . ')"></a>';
				echo '<a href="' . get_permalink(get_the_ID()) . '" class="title">' . get_the_title(). '</a>';
				echo '<small>' . get_the_date('F d, Y', get_the_ID()) . '</small>';
				echo '<a href="' . get_permalink(get_the_ID()) . '" class="read-more">Read more</a>';
				echo '</li>';

				$index ++;
			} else {
				break;
			}

		}

		wp_reset_postdata();

		echo '</ul>';
		echo '<a href="/?s=' . $keyword . '&post_type=post" class="see-all">See all articles (' . $articleQuery->found_posts . ')...</a>';
		echo '</div>';
	}

	echo '</div>';



	/*if(count($articles) > 0) {
		echo '<div class="second-column">';
		echo '<div class="articles">';
		echo '<h4>Articles</h4>';
		echo '<ul>';

		foreach($articles as $index => $article) {
			if($index < 2) {
				$imageUrl = wp_get_attachment_image_src(get_post_thumbnail_id($article->ID), 'full')[0];
				echo '<li>';
				echo '<div class="featured-image" style="background-image: url(' . $imageUrl . ')"></div>';
				echo '<a href="' . get_permalink($article->ID) . '" class="title">' . $article->post_title . '</a>';
				echo '<small>' . get_the_date('F d, Y', $article) . '</small>';
				echo '<a href="' . get_permalink($article->ID) . '" class="read-more">Read more</a>';
				echo '</li>';
			} else {
				break;
			}
		}

		echo '</ul>';
		echo '<a href="/?s=' . $keyword . '&post_type=post" class="see-all">See all articles (' . count($articles) . ')...</a>';
		echo '</div>';
		echo '</div>';
	}*/

	echo '<a href="#" class="close-search" title="Close Search Results" onclick="closeSearchWindow()"><i class="fas fa-times"></i></div>';

    die();
}