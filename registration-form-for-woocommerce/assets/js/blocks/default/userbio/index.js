import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/description', {
		title: __('User Bio', 'registration-form-for-woocommerce'),
		description: __(
			'User bio field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/default',
		keywords: [__('user bio')],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M12.5 4.857c.42 0 .831.126 1.18.361.35.236.622.57.783.962a2.159 2.159 0 0 1-.46 2.335 2.109 2.109 0 0 1-2.316.465 2.129 2.129 0 0 1-.954-.79 2.156 2.156 0 0 1 .264-2.705 2.116 2.116 0 0 1 1.503-.628ZM21 22H4V2h17v20Zm-7.083-2.857H8.25v-1.429h5.667v1.429Zm2.833-2.857h-8.5v-1.429h8.5v1.429Zm0-2.857h-8.5v-1.636a5.669 5.669 0 0 1 1.918-1.429 5.626 5.626 0 0 1 4.664 0 5.67 5.67 0 0 1 1.918 1.429v1.636ZM5.417 20.57h14.166V3.43H5.417v17.14Z" />
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
