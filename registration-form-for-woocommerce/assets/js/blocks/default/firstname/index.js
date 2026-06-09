import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/first-name', {
		title: __('First Name', 'registration-form-for-woocommerce'),
		description: __(
			'First name field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/default',
		keywords: [__('username')],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M17 12.714a2.143 2.143 0 1 1-4.287 0 2.143 2.143 0 0 1 4.287 0Zm2.143 6.429H10.57v-1.636a5.715 5.715 0 0 1 8.572 0v1.636Zm-15.714-10h2.857v4.286H4.857v1.428h4.286V13.43H7.714V9.143h12.857V20.57H3.43V9.143ZM2 22h20V7.714H7.714V3.43h1.429V2H4.857v1.429h1.429v4.285H2V22Z" />
					</svg>
				}
			/>
		),
		attributes,
		supports: {
			multiple: false,
			className: false,
			customClassName: false,
		},
		edit,
		save,
	});
};
