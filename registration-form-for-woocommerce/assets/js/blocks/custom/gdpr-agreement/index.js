import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export default () => {
	registerBlockType('tgwcfb/gdpr-agreement', {
		title: __('GDPR Agreement', 'registration-form-for-woocommerce'),
		description: __(
			'GDPR agreement field for WC registration form',
			'registration-form-for-woocommerce'
		),
		category: 'tgwcfb/custom',
		keywords: [
			__('gdpr', 'registration-form-for-woocommerce'),
			__('agreement', 'registration-form-for-woocommerce'),
		],
		icon: (
			<Icon
				size={24}
				icon={
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M18.563 6.375c-2.175 0-4.715-1.253-6.46-2.775a.16.16 0 0 0-.207 0c-1.733 1.512-4.283 2.775-6.459 2.775v6.562c0 2.096.723 3.62 1.863 4.788 1.02 1.045 2.406 1.835 4 2.453l.697.254.02.008c1.88-.656 3.52-1.52 4.683-2.714 1.14-1.169 1.863-2.693 1.863-4.789zm1.875 6.562c0 2.591-.919 4.583-2.395 6.098-1.45 1.488-3.399 2.475-5.416 3.178l-.007.003c-.401.136-.837.13-1.235-.012-2.023-.699-3.974-1.682-5.426-3.17-1.478-1.513-2.396-3.505-2.396-6.097V6.375A1.875 1.875 0 0 1 5.437 4.5c1.572 0 3.705-.983 5.234-2.319l.008-.007a2.034 2.034 0 0 1 2.5-.11l.142.11.01.007-.002.001C14.866 3.526 16.99 4.5 18.562 4.5a1.877 1.877 0 0 1 1.875 1.875z" />
						<path d="M14.15 9.462a.938.938 0 0 1 1.326 1.326l-3.75 3.75a.94.94 0 0 1-1.327 0l-1.875-1.875a.938.938 0 0 1 1.327-1.326l1.211 1.212z" />
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
