<?php
/**
 * Shortcode.
 *
 * @package ThemeGrill\WooCommerceRegistrationFormBuilder
 * @since 1.0.0
 */

namespace ThemeGrill\WooCommerceRegistrationFormBuilder;

defined( 'ABSPATH' ) || exit;

/**
 * Shortcode.
 *
 * @since 1.0.0
 */
class Shortcode {

	/**
	 * Shortcode constructor.
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
		add_action( 'init', array( $this, 'add_shortcode' ) );
		do_action( 'tgwcfb_shortcode_unhook' );
	}

	/**
	 * Add shortcode.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function add_shortcode() {
		add_shortcode( 'tgwcfb_registration_form', array( $this, 'form' ) );
	}

	/**
	 * Form.
	 *
	 * @since 1.0.0
	 * @param array $atts Shortcode attributes.
	 * @return false|string
	 */
	public function form( $atts ) {
		if ( empty( $atts ) || ! isset( $atts['id'] ) ) {
			return '';
		}

		if ( ! is_wc_active() ) {
			return apply_filters( 'tgwcfb_pre_form_message', '<p class="woocommerce-error">' . esc_html__( 'WooCommerce is required for this plugin to work. Please, activate WooCommerce first.', 'registration-form-for-woocommerce' ) . '</p>' );
		}

		if ( is_user_logged_in() && ! current_user_can( 'create_users' ) ) {
			$user         = get_user_by( 'ID', get_current_user_id() );
			$display_name = ! empty( $user->data->display_name ) ? $user->data->display_name : $user->data->user_email;

			$myaccount_url = wc_get_page_permalink( 'myaccount' );

			return apply_filters(
				'tgwcfb_pre_form_message',
				'<p class="woocommerce-error">' . sprintf(
					/* translators: 1: Current user display name 2: Logout URL */
					__( 'You are currently logged in as %1$s. %2$s', 'registration-form-for-woocommerce' ),
					'<a href="' . esc_url( $myaccount_url ) . '" title="' . esc_attr( $display_name ) . '">' . esc_html( $display_name ) . '</a>',
					'<a href="' . esc_url( wp_logout_url( $myaccount_url ) ) . '" title="' . esc_attr__( 'Log out of this account.', 'registration-form-for-woocommerce' ) . '">' . esc_html__( 'Logout', 'registration-form-for-woocommerce' ) . '  &#8594;</a>'
				) . '</p>'
			);
		}

		$atts = shortcode_atts(
			array(
				'id' => null,
			),
			$atts,
			'tgwcfb_form'
		);

		do_action( 'tgwcfb_form_shortcode_scripts', $atts );
		add_filter( 'body_class', array( $this, 'body_class' ) );

		ob_start();
		$this->render_form( $atts['id'] );
		return ob_get_clean();
	}

	/**
	 * Render form.
	 *
	 * @since 1.0.0
	 * @param int $id Post ID.
	 * @return void
	 */
	private function render_form( $id ) {
		$blocks  = get_blocks( $id );
		$content = render_blocks( $blocks );
		$content = apply_filters( 'tgwcfb_form_content', $content, $id );

		wp_enqueue_style( 'woocommerce-layout' );
		wp_enqueue_style( 'woocommerce-smallscreen' );
		wp_enqueue_style( 'woocommerce-general' );
		wp_enqueue_script( 'wc-password-strength-meter' );
		TGWCFB()->script_style->load_frontend_scripts_and_styles( get_block_names( $blocks ) );

		do_action( 'tgwcfb_enqueue_scripts' );

		wc_get_template(
			'form-registration.php',
			array(
				'content' => $content,
				'form_id' => $id,
			),
			TGWCFB_TEMPLATES,
			TGWCFB_TEMPLATES
		);
	}

	/**
	 * Add body classes.
	 *
	 * @since 1.0.0
	 * @param array $classes CSS classes.
	 * @return array Classes.
	 */
	public function body_class( $classes ) {
		if ( ! in_array( 'woocommerce-page', $classes, true ) ) {
			$classes[] = 'woocommerce-page';
		}
		$classes[] = 'tgwcfb-page';
		return $classes;
	}
}
