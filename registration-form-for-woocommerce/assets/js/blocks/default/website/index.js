import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/url', {
		title: __('Website', 'registration-form-for-woocommerce'),
		description: __(
			'Website field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/default',
		keywords: [
			__('website', 'registration-form-for-woocommerce'),
			__('url', 'registration-form-for-woocommerce'),
		],
		icon: (
			<Icon
				size={24}
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M20.563 9.15a5.666 5.666 0 0 0-.478-2.284 11.66 11.66 0 0 1-1.778.514 13.784 13.784 0 0 1 0 3.57c.606.123 1.2.295 1.778.513.32-.729.483-1.517.478-2.313Zm-1.235 3.57a8.8 8.8 0 0 0-1.285-.357 8.444 8.444 0 0 1-.714 1.963 5.712 5.712 0 0 0 2-1.606Zm-1.285-6.71c.439-.088.87-.207 1.292-.358a5.805 5.805 0 0 0-2.013-1.642c.32.622.563 1.282.721 1.964v.035Zm-3.191 8.851c.514 0 1.32-1.006 1.777-2.755a15.854 15.854 0 0 0-3.57 0c.472 1.749 1.279 2.755 1.793 2.755Zm-2.05-4.162a17.361 17.361 0 0 1 4.099 0 13.051 13.051 0 0 0 0-3.098 17.457 17.457 0 0 1-4.099 0 12.98 12.98 0 0 0 0 3.098Zm3.827-4.504c-.457-1.75-1.263-2.756-1.778-2.756-.514 0-1.32 1.007-1.777 2.756a15.888 15.888 0 0 0 3.555 0Zm-4.248 8.095a8.44 8.44 0 0 1-.714-1.963 9.18 9.18 0 0 0-1.292.357 5.804 5.804 0 0 0 2.006 1.606Zm0-10.28a5.711 5.711 0 0 0-2.006 1.607c.419.15.848.27 1.285.357.158-.682.4-1.342.721-1.964Zm-2.763 7.425a11.58 11.58 0 0 1 1.778-.514 13.775 13.775 0 0 1 0-3.57c-.605-.123-1.2-.295-1.778-.514a5.71 5.71 0 0 0 0 4.57v.028Zm9.517 3.426a7.141 7.141 0 0 1-11.28-7.138h-3v9.994h14.28V14.86ZM21.991 22H2v-1.428h19.991V22Zm-1.428-8.566v5.71H3.428V6.295h4.884a7.139 7.139 0 1 1 12.251 7.14Z" />
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
