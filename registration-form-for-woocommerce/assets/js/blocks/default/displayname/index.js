import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/display-name', {
		title: __('Display Name', 'registration-form-for-woocommerce'),
		description: __(
			'Display name field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/default',
		keywords: [__('display name', 'registration-form-for-woocommerce')],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M16.75 17.714h-8.5V16.08a5.67 5.67 0 0 1 1.918-1.429 5.626 5.626 0 0 1 4.664 0 5.67 5.67 0 0 1 1.918 1.429v1.635ZM9.667 6.286V4.857h5.666v1.429H9.667Zm4.958 5c0 .424-.125.838-.358 1.19a2.13 2.13 0 0 1-.954.79 2.11 2.11 0 0 1-2.316-.465 2.148 2.148 0 0 1-.46-2.335c.16-.392.433-.727.782-.962a2.113 2.113 0 0 1 2.684.266c.398.402.622.947.622 1.516ZM21 22H4V2h17v20ZM19.583 3.429H5.417V20.57h14.166V3.43Z" />
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
