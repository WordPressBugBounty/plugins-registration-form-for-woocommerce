import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/file-upload', {
		title: __('File Upload', 'registration-form-for-woocommerce'),
		description: __(
			'File Upload field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/custom',
		keywords: [__('File Upload', 'registration-form-for-woocommerce')],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M19.583 7.714h-4.25V3.43H5.417v17.14h14.166V7.714Zm-5.581 4.957-.794-.8v5.843h-1.416v-5.843l-.794.8L10 11.664l2.5-2.521 2.5 2.521-.998 1.007ZM21 22H4V2h12.36L21 6.614V22Z" />
					</svg>
				}
			/>
		),
		attributes,
		supports: {
			className: false,
			customClassName: false,
			multiple: false,
		},
		edit,
		save,
	});
};
