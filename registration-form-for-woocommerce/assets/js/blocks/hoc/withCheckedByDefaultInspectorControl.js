import { ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

export default createHigherOrderComponent((Component) => {
	return (props) => {
		if ('tgwcfb/gdpr-agreement' === props.name) {
			return (
				<>
					<Component {...props} />
					<ToggleControl
						label={__(
							'Checked by default',
							'registration-form-for-woocommerce'
						)}
						checked={props.attributes.checkedByDefault}
						onChange={() =>
							props.setAttributes({
								checkedByDefault: !props.attributes.checkedByDefault,
							})
						}
					/>
				</>
			);
		}

		return <Component {...props} />;
	};
}, 'withCheckedByDefaultInspectorControl');
