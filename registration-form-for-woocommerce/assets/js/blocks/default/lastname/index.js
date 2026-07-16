import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/last-name', {
		title: __('Last Name', 'registration-form-for-woocommerce'),
		description: __(
			'Last name field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/default',
		keywords: [__('lastname')],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M9.143 10.571a2.143 2.143 0 1 1 0 4.286 2.143 2.143 0 0 1 0-4.286Zm-4.286 6.936a5.714 5.714 0 0 1 8.572 0v1.636H4.857v-1.636Zm15.714 3.064H3.43V9.143h12.857v4.286h-1.429v1.428h4.286V13.43h-1.429V9.143h2.857V20.57ZM22 7.714h-4.286V3.43h1.429V2h-4.286v1.429h1.429v4.285H2V22h20V7.714Z" />
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
