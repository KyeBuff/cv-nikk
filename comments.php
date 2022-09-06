<?php
/**
 * The template for displaying comments.
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if (is_page()) {
	return;
}

$comment_args = [
	'order'   => 'ASC',
	'orderby' => 'comment_date_gmt',
	'status'  => 'approve',
	'post_id' => get_the_ID(),
];

$comments = get_comments( $comment_args );


$withoutPingbacks = array_filter($comments, function($comment) {
	return $comment->comment_type === 'comment';
});

$commentCount = count($withoutPingbacks);
	// Comment Reply Script.
if ( comments_open() && get_option( 'thread_comments' ) ) {
	wp_enqueue_script( 'comment-reply' );
}
?>

<section id="comments" class="comments-area">

	<?php
		comment_form(
			[
				'title_reply_before' => '<p id="reply-title" class="comment-reply-title">',
				'title_reply_after'  => '</p>',
			]
		);
	?>

	<div class="comments__title-count-wrapper
	<?php if ( !$commentCount ) : ?>
		comments__title-count-wrapper--empty
	<?php endif; ?>
	">
		<h3 class="title-comments
		">
			<?php
			$comments_number = $commentCount;
			if ( '1' === $comments_number ) {
				printf( esc_html_x( '1 Comment', 'comments title', 'hello-elementor' ) );
			} else {
				printf(
					esc_html( /* translators: 1: number of comments */
						_nx(
							'%1$s Response',
							'%1$s Responses',
							$comments_number,
							'comments title',
							'hello-elementor'
						)
					),
					esc_html( number_format_i18n( $comments_number ) )
				);
			}
			?>
		</h3>
		<?php echo do_shortcode('[social_warfare]'); ?>
	</div>
	<?php if ( have_comments() ) : ?>
		<?php the_comments_navigation(); ?>
		<ol class="comment-list">
		<?php
			wp_list_comments(
				[
					'style'       => 'ol',
					'short_ping'  => true,
					'avatar_size' => 42,
				]
			);
			?>
		</ol><!-- .comment-list -->

		<?php the_comments_navigation(); ?>

<?php endif; // Check for have_comments(). ?>

<?php
// If comments are closed and there are comments, let's leave a little note, shall we?
if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
	?>
	<p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'hello-elementor' ); ?></p>
<?php endif; ?>


</section><!-- .comments-area -->
