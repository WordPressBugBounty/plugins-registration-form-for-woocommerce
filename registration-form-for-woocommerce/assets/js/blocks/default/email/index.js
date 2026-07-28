import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/email', {
		title: __('Email', 'registration-form-for-woocommerce'),
		description: __(
			'Email field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/default',
		keywords: [__('username', 'registration-form-for-woocommerce')],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M2 4v15h20V4H2Zm10 9.443L4.436 5.5h15.128L12 13.443Zm0 2.114 2.857-3 4.707 4.943H4.436l4.707-4.943 2.857 3Zm8.571-9v9.885L15.864 11.5l4.707-4.942ZM8.136 11.5l-4.707 4.942V6.558L8.136 11.5Z" />
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
