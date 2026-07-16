import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/password', {
		title: __('Password', 'registration-form-for-woocommerce'),
		description: __(
			'Password field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/default',
		keywords: [__('password', 'registration-form-for-woocommerce')],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M9.667 7.714h5.666V6.286a2.87 2.87 0 0 0-.83-2.02 2.822 2.822 0 0 0-2.003-.837c-.751 0-1.472.3-2.004.836a2.87 2.87 0 0 0-.83 2.02v1.43Zm-4.25 12.857h14.166V9.143H5.417V20.57Zm2.833-4.285c-.28 0-.554-.084-.787-.241a1.44 1.44 0 0 1-.215-2.198 1.413 1.413 0 0 1 1.544-.31c.259.108.48.291.636.526a1.437 1.437 0 0 1-.176 1.804 1.41 1.41 0 0 1-1.002.419Zm4.25 0a1.409 1.409 0 0 1-1.309-.882 1.439 1.439 0 0 1 .307-1.557 1.413 1.413 0 0 1 1.544-.31c.259.108.48.291.636.526a1.437 1.437 0 0 1-.176 1.804 1.41 1.41 0 0 1-1.002.419Zm4.25 0a1.409 1.409 0 0 1-1.309-.882 1.439 1.439 0 0 1 .307-1.557 1.413 1.413 0 0 1 1.544-.31c.259.108.48.291.636.526a1.437 1.437 0 0 1-.176 1.804 1.41 1.41 0 0 1-1.002.419ZM21 22H4V7.714h4.25V6.286c0-1.137.448-2.227 1.245-3.03A4.232 4.232 0 0 1 12.5 2c1.127 0 2.208.452 3.005 1.255a4.304 4.304 0 0 1 1.245 3.03v1.43H21V22Z" />
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
