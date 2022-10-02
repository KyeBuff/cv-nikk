<?php
/**
 * The template for displaying the footer.
 *
 * Contains the body & html closing tags.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'footer' ) ) {
	if ( did_action( 'elementor/loaded' ) && hello_header_footer_experiment_active() ) {
		get_template_part( 'template-parts/dynamic-footer' );
	} else {
		get_template_part( 'template-parts/footer' );
	}
}
?>

<?php wp_footer(); ?>
<?php
    global $post;
    $post_slug = $post->post_name;
?>
<?php if (is_shop() || is_product_category() || $post_slug === 'nomadic-energy' || (is_product() && $post_slug !== 'the-van-conversion-bible')) : ?>
<script src="//code.tidio.co/lsxfnvkcydjknlnovpwrw97iekgk4mad.js" async></script>
<?php endif; ?>
</body>
</html>

<?php if (is_product()) : ?>
<?php
global $product;
$status = $product->get_stock_status();
$availability = "https://schema.org/InStock";
if ( $status === 'outofstock' ) {
	$availability = "https://schema.org/OutOfStock";
} else if ( $status === 'onbackorder' ) {
	$availability = "https://schema.org/BackOrder";
}

$attachment_ids = $product->get_gallery_image_ids();
$featured_image = $product->get_image_id();
$attachment_urls = [];

if ($featured_image) {
	$attachment_urls[] = wp_get_attachment_url( $featured_image );
}

foreach( $attachment_ids as $attachment_id ) {
	$attachment_urls[] = wp_get_attachment_url( $attachment_id );
}

$args = array (
	'post_type' => 'product',
	'post_id' => $product->get_id(),
	'status'      => 'approve',
	'post_status' => 'publish',
	'post_per_page' => 1,
	'orderby' => 'comment_content',
	'meta_query'  => array( array(
		'key'     => 'rating',
		'value'   => '5',
) ),
);


$reviews = get_comments( $args );

$review = !empty($reviews) ? $reviews[0] : false;


$sku = $product->sku;

if (empty($sku)) {
	$variations = $product->get_available_variations();
	if (!empty($variations)) {
		$variation = $variations[0];
		$sku = $variation['sku'];
	}
}

$structuredData = [
	"@context" => "https://schema.org/",
	"@type" => "Product",
	"name" => $product->name,
	"image" => $attachment_urls,
	"description" => esc_js(str_replace(['\n', '\r', '•'], '', strip_tags($product->short_description))),
	"sku" =>  $sku,
	"isbn" => $product->get_attribute('isbn'),
	"brand" => [
		"@type" => "Brand",
		"name" => $product->get_attribute('brand'),
	],
	"offers" => [
		"@type" => "Offer",
		"url" => get_permalink($product->get_id()),
		"price" => $product->is_on_sale() && $product->get_sale_price() ? $product->get_sale_price() : $product->get_price(),
		"priceCurrency" => "GBP",
		"availability" => $availability,
	]
];

if ($review) {
	$structuredData["review"] = [
		"@type" => "Review",
		"author" => [
			"@type" => "Person",
			"name" => $review->comment_author,
		],
		"reviewRating" => [
			"@type" => "Rating",
			"ratingValue" => get_comment_meta($review->comment_ID, 'rating'),
			"bestRating" => 5,
			"worstRating" => 1
		],
		"datePublished" => $review->comment_date,
		"description" => $review->comment_content,
	];
}

$review_count = $product->get_review_count();
if ($review_count) {
	$structuredData["aggregateRating"] = [
		"@type" => "AggregateRating",
		"ratingValue" => $product->get_average_rating(),
		"reviewCount" => $review_count
	];
}

?>
<script type="application/ld+json">
		<?php echo json_encode($structuredData); ?>
</script>
<?php endif;