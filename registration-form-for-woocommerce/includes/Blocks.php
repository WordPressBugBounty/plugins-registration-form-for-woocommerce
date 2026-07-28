<?php
/**
 * Blocks.
 *
 * @package ThemeGrill\WooCommerceRegistrationFormBuilder
 * @since 1.0.0
 */

namespace ThemeGrill\WooCommerceRegistrationFormBuilder;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Blocks.
 *
 * Register blocks and blocks categories.
 *
 * @since 1.0.0
 */
class Blocks {

	/**
	 * WP default blocks.
	 *
	 * @var string[]
	 */
	public $wp_default_blocks = array(
		'tgwcfb/username',
		'tgwcfb/email',
		'tgwcfb/password',
		'tgwcfb/confirm-password',
		'tgwcfb/first-name',
		'tgwcfb/last-name',
		'tgwcfb/display-name',
		'tgwcfb/nickname',
		'tgwcfb/url',
		'tgwcfb/description',
	);

	/**
	 * WC default blocks.
	 *
	 * @var string[]
	 */
	public $wc_default_blocks = array(
		'tgwcfb/billing-company',
		'tgwcfb/billing-country',
		'tgwcfb/billing-email',
		'tgwcfb/billing-first-name',
		'tgwcfb/billing-last-name',
		'tgwcfb/billing-phone',
		'tgwcfb/billing-address-1',
		'tgwcfb/billing-address-2',
		'tgwcfb/billing-city',
		'tgwcfb/billing-postcode',
		'tgwcfb/billing-state',
		'tgwcfb/separate-shipping',
		'tgwcfb/shipping-company',
		'tgwcfb/shipping-country',
		'tgwcfb/shipping-first-name',
		'tgwcfb/shipping-last-name',
		'tgwcfb/shipping-address-1',
		'tgwcfb/shipping-address-2',
		'tgwcfb/shipping-city',
		'tgwcfb/shipping-postcode',
		'tgwcfb/shipping-state',
		'tgwcfb/shipping-phone',
	);

	/**
	 * Custom blocks.
	 *
	 * @var string[]
	 */
	public $custom_blocks = array(
		'tgwcfb/user-roles',
		'tgwcfb/input',
		'tgwcfb/textarea',
		'tgwcfb/date-picker',
		'tgwcfb/time-picker',
		'tgwcfb/number',
		'tgwcfb/checkbox',
		'tgwcfb/radio',
		'tgwcfb/select',
		'tgwcfb/multi-select',
		'tgwcfb/range',
		'tgwcfb/profile-picture',
		'tgwcfb/secondary-email',
		'tgwcfb/phone',
		'tgwcfb/file-upload',
		'tgwcfb/gdpr-agreement',
	);

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init_hooks();
	}

	/**
	 * Init hooks.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function init_hooks() {
		if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
			add_filter( 'block_categories_all', array( $this, 'block_categories' ), PHP_INT_MAX, 2 );
			add_filter( 'allowed_block_types_all', array( $this, 'allowed_blocks' ), PHP_INT_MAX, 2 );
		} else {
			add_filter( 'block_categories', array( $this, 'block_categories' ), PHP_INT_MAX, 2 );
			add_filter( 'allowed_block_types', array( $this, 'allowed_blocks' ), PHP_INT_MAX, 2 );
		}
		add_action( 'init', array( $this, 'register_blocks' ) );
		add_filter( 'block_editor_settings_all', array( $this, 'inject_editor_critical_styles' ), 10, 2 );
		do_action( 'tgwcfb_blocks_unhook' );
	}

	/**
	 * Inject critical layout CSS into the block editor settings.
	 *
	 * Centering rules live in blocks.css (loaded async as an editor_style
	 * <link> inside the iframe). Without them on first paint, the post title
	 * renders full-width on the left, then snaps to center — causing a jerk.
	 * Styles in the editor settings array are inlined into the iframe document
	 * before first paint.
	 *
	 * @since 1.1.2
	 * @param array                    $settings Editor settings.
	 * @param \WP_Block_Editor_Context $context  Editor context.
	 * @return array
	 */
	public function inject_editor_critical_styles( $settings, $context ) {
		$post = isset( $context->post ) ? $context->post : null;

		if ( ! $post || 'tgwcfb_form' !== $post->post_type ) {
			return $settings;
		}

		$critical_css = '
			.edit-post-visual-editor__post-title-wrapper,
			.editor-visual-editor__post-title-wrapper,
			.editor-post-title,
			.editor-post-title__block,
			.wp-block.editor-post-title,
			.block-editor-block-list__layout,
			.is-root-container {
				max-width: 650px !important;
				margin-left: auto !important;
				margin-right: auto !important;
			}
		';

		if ( ! isset( $settings['styles'] ) || ! is_array( $settings['styles'] ) ) {
			$settings['styles'] = array();
		}

		array_unshift(
			$settings['styles'],
			array(
				'css'            => $critical_css,
				'__unstableType' => 'plugin',
			)
		);

		return $settings;
	}

	/**
	 * Add categories to default WP block categories.
	 *
	 * @since 1.0.0
	 * @param array $categories Block categories.
	 * @return array[]|string[][]|void[][] Block categories.
	 */
	public function block_categories( $categories ) {
		return array_merge(
			array(
				array(
					'slug'  => 'tgwcfb/default',
					'title' => __( 'Default Fields', 'registration-form-for-woocommerce' ),
				),
				array(
					'slug'  => 'tgwcfb/custom',
					'title' => __( 'Custom Fields', 'registration-form-for-woocommerce' ),
				),
				array(
					'slug'  => 'tgwcfb/billing',
					'title' => __( 'WooCommerce Billing Address', 'registration-form-for-woocommerce' ),
				),
				array(
					'slug'  => 'tgwcfb/shipping',
					'title' => __( 'WooCommerce Shipping Address', 'registration-form-for-woocommerce' ),
				),
			),
			$categories
		);
	}

	/**
	 * Register blocks.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_blocks() {
		global $pagenow;
		$args = array(
			'editor_script' => 'tgwcfb-blocks',
			'editor_style'  => 'tgwcfb-blocks',
		);

		// phpcs:disable WordPress.Security.NonceVerification.Recommended
		if (
			( 'post-new.php' === $pagenow && isset( $_REQUEST['post_type'] ) && 'tgwcfb_form' === sanitize_text_field( wp_unslash( $_REQUEST['post_type'] ) ) ) ||
			( 'post.php' === $pagenow && isset( $_GET['post'] ) && 'tgwcfb_form' === get_post_type( intval( wp_unslash( $_GET['post'] ) ) ) )
		) {
			$id = isset( $_GET['post'] ) ? intval( wp_unslash( $_GET['post'] ) ) : null;
			// phpcs:enable WordPress.Security.NonceVerification.Recommended
			add_filter(
				'admin_body_class',
				function ( $classes ) use ( $id ) {
					$classes .= is_null( $id ) ? 'tgwcfb_form' : "tgwcfb_form_$id";
					return $classes;
				}
			);
			foreach ( array_merge( $this->wp_default_blocks, $this->wc_default_blocks, $this->custom_blocks ) as $block ) {
				register_block_type(
					$block,
					$args
				);
			}
		}
	}

	/**
	 * Filter allowed blocks.
	 *
	 * @since 1.0.0
	 * @param array|bool                        $blocks Allowed blocks.
	 * @param \WP_Block_Editor_Context|\WP_Post $context The current block editor context.
	 * @return string[]|bool
	 */
	public function allowed_blocks( $blocks, $context ) {
		global $pagenow;
		if ( ! in_array( $pagenow, array( 'post.php', 'post-new.php' ), true ) ) {
			return $blocks;
		}
		$post_type = property_exists( $context, 'post' ) ? $context->post->post_type : $context->post_type;
		return 'tgwcfb_form' !== $post_type ? $blocks : array_merge( $this->wp_default_blocks, $this->wc_default_blocks, $this->custom_blocks, array( 'core/heading', 'core/paragraph', 'core/group' ) );
	}
}
