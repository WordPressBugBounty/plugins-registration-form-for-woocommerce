import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/username', {
		title: __('Username', 'registration-form-for-woocommerce'),
		description: __(
			'Username field for WC registration form',
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
						<path d="M21.871 21.179a9.934 9.934 0 0 0-7.635-8.207 5.714 5.714 0 1 0-4.472 0A9.936 9.936 0 0 0 2.13 21.18L2 22h20l-.129-.821ZM7.714 7.715a4.285 4.285 0 1 1 8.57 0 4.285 4.285 0 0 1-8.57 0ZM3.707 20.572a8.57 8.57 0 0 1 16.586 0H3.707Z" />
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
