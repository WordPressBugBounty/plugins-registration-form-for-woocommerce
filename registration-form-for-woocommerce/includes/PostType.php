<?php
/**
 * PostType.
 *
 * @since 1.0.0
 * @package ThemeGrill\WooCommerceRegistrationFormBuilder
 */

namespace ThemeGrill\WooCommerceRegistrationFormBuilder;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * PosType.
 *
 * @since 1.0.0
 */
class PostType {

	/**
	 * PostType constructor.
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
		add_action( 'init', array( $this, 'register_post_types' ), 5 );
		add_action( 'init', array( $this, 'register_meta' ) );
		add_filter( 'default_content', array( $this, 'add_default_content' ), 10, 2 );
		add_filter( 'default_title', array( $this, 'add_default_title' ), 10, 2 );
		add_filter( 'manage_edit-tgwcfb_form_columns', array( $this, 'add_column_head' ) );
		add_action( 'manage_tgwcfb_form_posts_custom_column', array( $this, 'add_column_content' ) );
		add_filter( 'months_dropdown_results', array( $this, 'remove_date_filter' ), 10, 2 );
		add_filter( 'post_row_actions', array( $this, 'row_actions' ), 10, 2 );
		add_action( 'admin_menu', array( $this, 'add_submenu' ) );
		add_action( 'admin_head', array( $this, 'upgrade_menu_styles' ) );
		add_action( 'admin_footer', array( $this, 'print_shortcode_copy_script' ) );
		add_action( 'admin_footer', array( $this, 'add_editor_header_text' ) );
		add_filter( 'pll_get_post_types', array( $this, 'add_tgwcfb_to_pll' ) );
		do_action( 'tgwcfb_post_type_unhook' );
	}

	/**
	 * Add private CPT tgwcfb_form for translation.
	 *
	 * @param array $post_types Post types.
	 * @return mixed
	 */
	public function add_tgwcfb_to_pll( $post_types ) {
		$post_types['tgwcfb_form'] = 'tgwcfb_form';
		return $post_types;
	}

	/**
	 * Add submenu.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function add_submenu() {
		add_submenu_page(
			'edit.php?post_type=tgwcfb_form',
			__( 'Settings', 'registration-form-for-woocommerce' ),
			__( 'Settings', 'registration-form-for-woocommerce' ),
			'manage_options',
			'settings',
			array( $this, 'settings_page' )
		);

		add_submenu_page(
			'edit.php?post_type=tgwcfb_form',
			__( 'Settings', 'registration-form-for-woocommerce' ),
			__( 'Settings', 'registration-form-for-woocommerce' ),
			'manage_options',
			'settings/#sync-settings',
			array( $this, 'settings_page' )
		);

		remove_submenu_page( 'edit.php?post_type=tgwcfb_form', 'settings' );

		$upgrade_url = 'https://themegrill.com/plugins/registration-form-for-woocommerce/';

		add_submenu_page(
			'edit.php?post_type=tgwcfb_form',
			'',
			'<span class="tgwcfb-upgrade-menu-item"><span class="tgwcfb-upgrade-menu-crown"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg></span>' . esc_html__( 'Upgrade to Pro', 'registration-form-for-woocommerce' ) . '</span>',
			'manage_options',
			esc_url( $upgrade_url ),
			null
		);
	}

	/**
	 * Output styles and script for the Upgrade to Pro menu item.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function upgrade_menu_styles() {
		?>
		<style>
		#adminmenu .tgwcfb-upgrade-menu-item {
			display: inline-flex;
			align-items: center;
			gap: 6px;
			color: #ff8c39 !important;
			font-weight: 600;
		}
		#adminmenu .tgwcfb-upgrade-menu-crown {
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
		#adminmenu .tgwcfb-upgrade-menu-crown svg {
			width: 16px;
			height: 16px;
			stroke: currentColor;
			fill: none;
		}
		#adminmenu a:hover .tgwcfb-upgrade-menu-item {
			color: #ffb27a !important;
		}
		</style>
		<script>
		document.addEventListener('DOMContentLoaded', function() {
			var item = document.querySelector('#adminmenu .tgwcfb-upgrade-menu-item');
			if (item) {
				var link = item.closest('a');
				if (link) {
					link.setAttribute('target', '_blank');
					link.setAttribute('rel', 'noopener noreferrer');
				}
			}
		});
		</script>
		<?php
	}

	/**
	 * Settings page.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function settings_page() {
		echo '<div id="tgwcfb-settings"></div>';
	}

	/**
	 * Register post type.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_post_types() {
		register_post_type(
			'tgwcfb_form',
			apply_filters(
				'tgwcfb_form_post_type',
				array(
					'labels'              => array(
						'name'               => __( 'All Forms', 'registration-form-for-woocommerce' ),
						'singular_name'      => __( 'Form', 'registration-form-for-woocommerce' ),
						'menu_name'          => _x( 'Registration Form', 'Admin menu name', 'registration-form-for-woocommerce' ),
						'all_items'          => __( 'All forms', 'registration-form-for-woocommerce' ),
						'add_new'            => __( 'Add form', 'registration-form-for-woocommerce' ),
						'add_new_item'       => __( 'Add new form', 'registration-form-for-woocommerce' ),
						'edit'               => __( 'Edit', 'registration-form-for-woocommerce' ),
						'edit_item'          => __( 'Edit form', 'registration-form-for-woocommerce' ),
						'new_item'           => __( 'New form', 'registration-form-for-woocommerce' ),
						'view'               => __( 'View forms', 'registration-form-for-woocommerce' ),
						'view_item'          => __( 'View form', 'registration-form-for-woocommerce' ),
						'search_items'       => __( 'Search forms', 'registration-form-for-woocommerce' ),
						'not_found'          => __( 'No forms found', 'registration-form-for-woocommerce' ),
						'not_found_in_trash' => __( 'No forms found in trash', 'registration-form-for-woocommerce' ),
						'parent'             => __( 'Parent form', 'registration-form-for-woocommerce' ),
					),
					'exclude_from_search' => true,
					'supports'            => array( 'editor', 'custom-fields', 'title', 'revisions' ),
					'show_in_rest'        => true,
					'public'              => false,
					'publicly_queryable'  => false,
					'show_ui'             => true,
					'show_in_menu'        => true,
					'query_var'           => true,
					'rewrite'             => false,
					'capabilities'        => array(
						'publish_posts'       => 'manage_options',
						'edit_posts'          => 'manage_options',
						'edit_others_posts'   => 'manage_options',
						'delete_posts'        => 'manage_options',
						'delete_others_posts' => 'manage_options',
						'read_private_posts'  => 'manage_options',
						'edit_post'           => 'manage_options',
						'delete_post'         => 'manage_options',
						'read_post'           => 'manage_options',
					),
					'has_archive'         => false,
					'hierarchical'        => false,
					'menu_position'       => 50,
					'menu_icon'           => 'data:image/svg+xml;base64,' . base64_encode( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239.1 263.9"><path fill="#a7aaad" d="M178.4 123.2H55.5c-1.2 0-2.1-.9-2.1-2.1v-17.8c0-1.2.9-2.1 2.1-2.1h122.8c1.2 0 2.1.9 2.1 2.1v17.8c.1 1.2-.9 2.1-2 2.1zm-.2 40.8H55.3c-1.2 0-2.1-.9-2.1-2.1v-17.8c0-1.2.9-2.1 2.1-2.1h122.8c1.2 0 2.1.9 2.1 2.1v17.8c.1 1.2-.9 2.1-2 2.1zm-9.2 40.8h-51.5c-6.3 0-11.4-4.9-11.4-11s5.1-11 11.4-11H169c6.3 0 11.4 4.9 11.4 11 .1 6-5.1 11-11.4 11z"/><path fill="#a7aaad" d="M224.8 74.6l-51.2-56.3c-1.2-1.4-3-2.1-4.8-2.1h-140c-7.5 0-13.6 6.4-13.6 14.3v202.2c0 7.9 6.1 14.3 13.6 14.3h184.1c7.5 0 13.6-6.4 13.6-14.3V79c0-1.6-.6-3.2-1.7-4.4zm-50.3-35.9l32.9 36.1h-32.9V38.7zm39 194c0 .9-.5 1.3-.6 1.3H28.8c-.1 0-.6-.4-.6-1.3V30.5c0-.9.5-1.3.6-1.3h132.7v48.5c0 5.6 4.4 10.1 9.7 10.1h42.2v144.9z"/></svg>' ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
				)
			)
		);
	}

	/**
	 * Add default content while new form is created.
	 *
	 * @param string   $content Post content.
	 * @param \WP_Post $post Post object.
	 *
	 * @return mixed
	 */
	public function add_default_content( $content, $post ) {
		if ( 'tgwcfb_form' === $post->post_type ) {
			$content = default_content();
		}
		return $content;
	}

	/**
	 * Add default content while new form is created.
	 *
	 * @param string   $title Post title.
	 * @param \WP_Post $post Post object.
	 *
	 * @return string
	 */
	public function add_default_title( $title, $post ) {
		if ( 'tgwcfb_form' === $post->post_type ) {
			return "Form #$post->ID";
		}
		return $title;
	}

	/**
	 * Add columns.
	 *
	 * @since 1.0.0
	 * @param array $columns Columns.
	 * @return array
	 */
	public function add_column_head( $columns ) {
		return array_merge(
			array_slice( $columns, 0, 2 ),
			array( 'shortcode' => esc_html__( 'Shortcode', 'registration-form-for-woocommerce' ) ),
			array_slice( $columns, 2 )
		);
	}

	/**
	 * Add column content.
	 *
	 * @since 1.0.0
	 * @param String $column Column slug.
	 * @return void
	 */
	public function add_column_content( $column ) {
		global $post;
		if ( 'shortcode' !== $column ) {
			return;
		}
		?>
		<div class="tgwcfb-shortcode-wrap">
			<input style="width: calc(100% - 160px)" type="text" class="widefat code" readOnly onfocus="this.select();" value='[tgwcfb_registration_form id="<?php echo esc_attr( $post->ID ); ?>"]' />
			<button title="<?php esc_attr_e( 'Copy shortcode!', 'registration-form-for-woocommerce' ); ?>" style="line-height: 1; padding: 4px" class="button tgwcfb-copy-shortcode">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tgwcfb-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
			</button>
		</div>
		<?php
	}

	/**
	 * Remove date filter.
	 *
	 * @since 1.0.0
	 * @param object $months Months.
	 * @param string $post_type Post type.
	 * @return object|array
	 */
	public function remove_date_filter( $months, $post_type ) {
		return 'tgwcfb_form' === $post_type ? array() : $months;
	}

	/**
	 * Remove trash action.
	 *
	 * @since 1.0.0
	 * @param array  $actions Post actions.
	 * @param object $post Post data.
	 * @return array
	 */
	public function row_actions( $actions, $post ) {
		return array_merge( array( 'id' => '<span class="id">ID: ' . $post->ID . '</span>' ), $actions );
	}

	/**
	 * Register post meta.
	 *
	 * @since xx.x
	 * @return void
	 */
	public function register_meta() {
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_recaptcha_v2',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_recaptcha_v2_as_invisible',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_recaptcha_v3',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_user_approval',
			array(
				'default'       => 'auto_login',
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_account_created_message',
			array(
				'default'       => __(
					'Registration complete, wait until admin approves your registration',
					'registration-form-for-woocommerce'
				),
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_pending_approval_message',
			array(
				'default'       => __( 'Your account is still pending approval', 'registration-form-for-woocommerce' ),
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_account_denied_message',
			array(
				'default'       => __( 'Your account has been denied', 'registration-form-for-woocommerce' ),
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_redirect_url',
			array(
				'default'       => '',
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_hcaptcha',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_submit_btn_text',
			array(
				'default'       => __( 'Register', 'registration-form-for-woocommerce' ),
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_enable_default_user_role',
			array(
				'default'       => false,
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
				'auth_callback' => '__return_true',
			)
		);
		register_post_meta(
			'tgwcfb_form',
			'_tgwcfb_default_user_role',
			array(
				'default'       => 'customer',
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'auth_callback' => '__return_true',
			)
		);
	}

	/**
	 * Print shortcode copy script.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function print_shortcode_copy_script() {
		global $current_screen;
		if ( 'edit-tgwcfb_form' !== $current_screen->id ) {
			return;
		}
		wp_enqueue_script( 'jquery-ui-tooltip' );
		wp_enqueue_style( 'jquery-ui-style', TGWCFB_ASSETS_DIR_URL . '/css/jquery-ui/jquery-ui.min.css', array(), TGWCFB_VERSION );
		?>
		<script>
			jQuery(document).ready(function(o){o("<style>.tgwcfb-tooltip{ background-color: #2271b1 ! important; background-image: none ! important; opacity: 1 !important; border: none !important; font-size: 12px !important; color: #fff !important</style>").appendTo(o("head"));var t=o(".tgwcfb-copy-shortcode"),e={position:{at:"center bottom",my:"center top"},tooltipClass:"tgwcfb-tooltip",content:"<?php echo esc_js( __( 'Copy shortcode !', 'registration-form-for-woocommerce' ) ); ?>"};t.tooltip(e),t.on("click",function(t){t.preventDefault();var e=o('<textarea style="opacity:0">'),n=o(this);o("body").append(e),e.val(n.prev().val()).select();try{document.execCommand("copy"),n.trigger("shortcodeCopied")}catch(o){console.log(o)}e.remove()}).on("shortcodeCopied",function(){o(this).tooltip("destroy"),o(this).tooltip(Object.assign({},e,{content:"<?php echo esc_js( __( 'Copied !', 'registration-form-for-woocommerce' ) ); ?>"})).tooltip("open")}).on("mouseleave",function(){o(this).tooltip("destroy"),o(this).tooltip(e)})});
		</script>
		<?php
	}

	/**
	 * Add text to editor header for tgwcfb_form post type.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function add_editor_header_text() {
		global $current_screen, $post;

		// Check if we're on the post edit screen for tgwcfb_form post type.
		if ( ! $current_screen || 'post' !== $current_screen->base ) {
			return;
		}

		// Check post type from screen or post object.
		$post_type = '';
		if ( $post && isset( $post->post_type ) ) {
			$post_type = $post->post_type;
		} elseif ( $current_screen && isset( $current_screen->post_type ) ) {
			$post_type = $current_screen->post_type;
		}

		if ( 'tgwcfb_form' !== $post_type ) {
			return;
		}

		// Only run in block editor (Gutenberg).
		if ( ! $current_screen->is_block_editor() ) {
			return;
		}

		$copy_text   = esc_js( __( 'Copy shortcode!', 'registration-form-for-woocommerce' ) );
		$copied_text = esc_js( __( 'Copied!', 'registration-form-for-woocommerce' ) );
		$post_id     = $post && isset( $post->ID ) ? $post->ID : 0;
		?>
		<style>
		.tgwcfb-header-copy-shortcode {
			position: relative;
		}
		.tgwcfb-header-copy-shortcode::after {
			content: '<?php echo $copy_text; ?>';
			position: absolute;
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%);
			margin-bottom: 5px;
			padding: 4px 8px;
			background-color: #2271b1;
			color: #fff;
			font-size: 12px;
			white-space: nowrap;
			border-radius: 3px;
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.2s;
			z-index: 1000;
		}
		.tgwcfb-header-copy-shortcode::before {
			content: '';
			position: absolute;
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%);
			margin-bottom: -1px;
			border: 5px solid transparent;
			border-top-color: #2271b1;
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.2s;
			z-index: 1000;
		}
		.tgwcfb-header-copy-shortcode:hover::after,
		.tgwcfb-header-copy-shortcode:hover::before {
			opacity: 1;
		}
		.tgwcfb-header-copy-shortcode.copied::after {
			content: '<?php echo $copied_text; ?>';
			opacity: 1;
		}
		.tgwcfb-header-copy-shortcode.copied::before {
			opacity: 1;
		}
		</style>
		<script>
		(function() {
			function getPostId() {
				// Try to get post ID from WordPress editor state
				if (typeof wp !== 'undefined' && wp.data && wp.data.select('core/editor')) {
					var postId = wp.data.select('core/editor').getCurrentPostId();
					if (postId) {
						return postId;
					}
				}

				// Fallback: try to get from URL
				var urlParams = new URLSearchParams(window.location.search);
				var postId = urlParams.get('post');
				if (postId) {
					return parseInt(postId);
				}

				// Fallback: try to get from PHP
				return <?php echo (int) $post_id; ?>;
			}

			function updateShortcode(inputField, postId) {
				if (postId && postId > 0) {
					inputField.value = '[tgwcfb_registration_form id="' + postId + '"]';
				} else {
					inputField.value = '<?php echo esc_js( __( 'Save the form to get shortcode', 'registration-form-for-woocommerce' ) ); ?>';
					inputField.style.color = '#999';
				}
			}

			function insertHeaderText() {
				var editorHeader = document.querySelector('.edit-post-header');
				if (!editorHeader || editorHeader.querySelector('.tgwcfb-header-shortcode-wrap')) {
					return false;
				}

				// Find the save draft button element.
				var saveDraftButton = editorHeader.querySelector('.components-button.editor-post-save-draft.is-compact.is-tertiary');
				if (!saveDraftButton) {
					// Try alternative selectors in case classes vary
					saveDraftButton = editorHeader.querySelector('.editor-post-save-draft');
					if (!saveDraftButton) {
						saveDraftButton = editorHeader.querySelector('button[aria-label*="Save"], button[aria-label*="save"]');
					}
				}

				// Get post ID
				var postId = getPostId();

				// Create wrapper div
				var shortcodeWrap = document.createElement('div');
				shortcodeWrap.className = 'tgwcfb-header-shortcode-wrap';
				shortcodeWrap.style.cssText = 'margin-left: auto; padding: 0 12px; display: flex; align-items: center; gap: 8px;';

				// Create input field
				var inputField = document.createElement('input');
				inputField.type = 'text';
				inputField.className = 'tgwcfb-header-shortcode-input';
				inputField.readOnly = true;
				inputField.style.cssText = 'width: 280px; padding: 4px 8px; font-size: 12px; font-family: monospace; border: 1px solid #ddd; border-radius: 2px; background: #fff;';
				inputField.onfocus = function() { this.select(); };

				// Set initial shortcode value
				updateShortcode(inputField, postId);

				// Create copy button
				var copyButton = document.createElement('button');
				copyButton.type = 'button';
				copyButton.className = 'button tgwcfb-header-copy-shortcode';
				copyButton.title = '<?php echo esc_js( __( 'Copy shortcode!', 'registration-form-for-woocommerce' ) ); ?>';
				copyButton.style.cssText = 'line-height: 1; padding: 4px; min-width: 32px; height: 28px; display: flex; align-items: center; justify-content: center; position: relative;';

				// Add SVG icon
				var svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
				svgIcon.setAttribute('width', '16');
				svgIcon.setAttribute('height', '16');
				svgIcon.setAttribute('viewBox', '0 0 24 24');
				svgIcon.setAttribute('fill', 'none');
				svgIcon.setAttribute('stroke', 'currentColor');
				svgIcon.setAttribute('stroke-width', '2');
				svgIcon.setAttribute('stroke-linecap', 'round');
				svgIcon.setAttribute('stroke-linejoin', 'round');
				svgIcon.className = 'tgwcfb-copy';

				var rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rect1.setAttribute('width', '14');
				rect1.setAttribute('height', '14');
				rect1.setAttribute('x', '8');
				rect1.setAttribute('y', '8');
				rect1.setAttribute('rx', '2');
				rect1.setAttribute('ry', '2');

				var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				path1.setAttribute('d', 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2');

				svgIcon.appendChild(rect1);
				svgIcon.appendChild(path1);
				copyButton.appendChild(svgIcon);

				// Copy functionality
				copyButton.addEventListener('click', function(e) {
					e.preventDefault();
					inputField.select();
					try {
						document.execCommand('copy');
						// Add 'copied' class to show tooltip
						copyButton.classList.add('copied');
						setTimeout(function() {
							copyButton.classList.remove('copied');
						}, 2000);
					} catch(err) {
						console.log('Failed to copy:', err);
					}
				});

				// Append input and button to wrapper
				shortcodeWrap.appendChild(inputField);
				shortcodeWrap.appendChild(copyButton);

				if (saveDraftButton && saveDraftButton.parentNode) {
					// Insert before the save draft button.
					saveDraftButton.parentNode.insertBefore(shortcodeWrap, saveDraftButton);
				} else {
					// Fallback: try to find the toolbar and insert before it
					var headerToolbar = editorHeader.querySelector('.edit-post-header__toolbar');
					if (headerToolbar && headerToolbar.parentNode) {
						headerToolbar.parentNode.insertBefore(shortcodeWrap, headerToolbar);
					} else {
						// Last fallback: append to header.
						editorHeader.appendChild(shortcodeWrap);
					}
				}

				// Listen for post save to update shortcode if post ID was 0
				if (!postId || postId === 0) {
					// Subscribe to WordPress editor store to get post ID when saved
					if (typeof wp !== 'undefined' && wp.data && wp.data.subscribe) {
						var unsubscribe = wp.data.subscribe(function() {
							var newPostId = getPostId();
							if (newPostId && newPostId > 0 && newPostId !== postId) {
								updateShortcode(inputField, newPostId);
								inputField.style.color = '#1e1e1e';
								// Unsubscribe after getting the ID
								if (unsubscribe) {
									unsubscribe();
								}
							}
						});
					}
				}

				return true;
			}

			// Wait for the editor to be ready.
			if (typeof wp !== 'undefined' && wp.domReady) {
				wp.domReady(function() {
					// Use MutationObserver to wait for the editor header to be available.
					var observer = new MutationObserver(function(mutations) {
						if (insertHeaderText()) {
							observer.disconnect();
						}
					});

					// Start observing the document body for changes.
					observer.observe(document.body, {
						childList: true,
						subtree: true
					});

					// Also try immediately in case the header is already loaded.
					if (insertHeaderText()) {
						observer.disconnect();
					}
				});
			} else {
				// Fallback for older WordPress versions or if wp.domReady is not available.
				document.addEventListener('DOMContentLoaded', function() {
					setTimeout(function() {
						insertHeaderText();
					}, 1000);
				});
			}
		})();
		</script>
		<?php
	}
}
