import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/checkbox', {
		title: __('Checkbox', 'registration-form-for-woocommerce'),
		description: __(
			'Checkbox field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/custom',
		keywords: [__('checkbox', 'registration-form-for-woocommerce')],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="m6.95 11.75 3.029 3.029 7.071-7.072 1.014 1.007L9.98 16.8l-4.043-4.043L6.95 11.75Zm13.621-8.321H3.43V20.57h17.14V3.43ZM22 22H2V2h20v20Z" />
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
