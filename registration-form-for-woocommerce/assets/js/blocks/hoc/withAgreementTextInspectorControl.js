import { TextareaControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

export default createHigherOrderComponent((Component) => {
	return (props) => {
		if ('tgwcfb/gdpr-agreement' === props.name) {
			return (
				<>
					<TextareaControl
						label={__('Agreement Text', 'registration-form-for-woocommerce')}
						value={props.attributes.agreementText}
						onChange={(val) => props.setAttributes({ agreementText: val })}
					/>
					<Component {...props} />
				</>
			);
		}
		return <Component {...props} />;
	};
}, 'withAgreementTextInspectorControl');
