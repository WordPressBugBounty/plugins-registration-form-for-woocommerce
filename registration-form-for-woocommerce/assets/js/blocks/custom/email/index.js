import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/secondary-email', {
		title: __('Secondary Email', 'registration-form-for-woocommerce'),
		description: __(
			'Secondary email field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/custom',
		keywords: [__('email', 'registration-form-for-woocommerce')],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M14.857 6.286h1.429V4.857h1.428v1.429h1.429v1.428h-1.429v1.429h-1.428V7.714h-1.429V6.286ZM17 10.57a3.571 3.571 0 1 0 0-7.142 3.571 3.571 0 0 0 0 7.142Zm-13.571-.42v9.414l4.707-4.707-4.707-4.707ZM12 16.707 16.721 12a4.999 4.999 0 0 1-4.228-2.857H4.436L12 16.707Zm7.564 3.864-4.707-4.707L12 18.721l-2.857-2.857-4.707 4.707h15.128Zm1.007-10.078a4.837 4.837 0 0 1-1.292.95l-3.415 3.414 4.707 4.707v-9.071ZM22 22H2V7.714h10.057A4.746 4.746 0 0 1 12 7a5 5 0 0 1 10 0v15Z" />
					</svg>
				}
			/>
		),
		attributes,
		supports: {
			className: false,
			customClassName: false,
		},
		edit,
		save,
	});
};
