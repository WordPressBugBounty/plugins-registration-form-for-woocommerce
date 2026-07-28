import { TextControl, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

export default createHigherOrderComponent((Component) => {
	return (props) => {
		if (['tgwcfb/email'].includes(props.name)) {
			return (
				<>
					<ToggleControl
						label={__(
							'Enable email confirmation',
							'registration-form-for-woocommerce'
						)}
						checked={props.attributes.confirmEmail}
						onChange={() =>
							props.setAttributes({
								confirmEmail: !props.attributes.confirmEmail,
							})
						}
					/>
					{props.attributes.confirmEmail && (
						<>
							<TextControl
								label={__(
									'Confirmation Label',
									'registration-form-for-woocommerce'
								)}
								value={props.attributes.confirmEmailLabel}
								onChange={(val) =>
									props.setAttributes({ confirmEmailLabel: val })
								}
							/>
							<TextControl
								label={__(
									'Confirmation Placeholder',
									'registration-form-for-woocommerce'
								)}
								value={props.attributes.confirmEmailPlaceholder}
								onChange={(val) =>
									props.setAttributes({ confirmEmailPlaceholder: val })
								}
							/>
						</>
					)}
					<Component {...props} />
				</>
			);
		}

		return <Component {...props} />;
	};
}, 'withConfirmEmailInspectorControl');
