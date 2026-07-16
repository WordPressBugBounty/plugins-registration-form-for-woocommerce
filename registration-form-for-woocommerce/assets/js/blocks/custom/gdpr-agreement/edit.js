import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '../../common';
import { useClientId, useUpdateLabel } from '../../hooks';

export default (props) => {
	const {
		attributes: {
			clientId,
			label,
			description,
			required,
			className,
			hasDescription,
			fieldWidth,
			agreementText,
			checkedByDefault,
		},
		setAttributes,
	} = props;

	useClientId(
		props.clientId,
		setAttributes,
		props.attributes,
		'gdpr-agreement'
	);

	useUpdateLabel(
		props,
		__('GDPR Agreement', 'registration-form-for-woocommerce')
	);

	return (
		<>
			<InspectorControls {...props} />
			<div
				data-id={`gdpr_agreement_${clientId}`}
				className={`form-row field-width-${fieldWidth}${
					className && ' ' + className
				}`}
			>
				<RichText
					className={`tgwcfb-label ${required ? 'required' : ''}`}
					value={label}
					tagName="label"
					onChange={(val) => setAttributes({ label: val })}
					htmlFor={`gdpr_agreement_${clientId}`}
					allowedFormats={[]}
					placeholder={__('Enter label', 'registration-form-for-woocommerce')}
				/>
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
					<input
						type="checkbox"
						name={`gdpr_agreement_${clientId}`}
						id={`gdpr_agreement_${clientId}`}
						checked={checkedByDefault}
						disabled
					/>
					<RichText
						className={`tgwcfb-agreement-text ${required ? 'required' : ''}`}
						value={
							agreementText ||
							'I consent to the use of my submitted information to respond to my inquiry.'
						}
						tagName="span"
						onChange={(val) => setAttributes({ agreementText: val })}
						htmlFor={`gdpr_agreement_${clientId}`}
						allowedFormats={[]}
						placeholder={__(
							'Enter agreement text',
							'registration-form-for-woocommerce'
						)}
						style={{ flex: 1 }}
					/>
				</div>

				{hasDescription && (
					<RichText
						className="input-description"
						value={description}
						tagName="span"
						placeholder={__(
							'Enter description',
							'registration-form-for-woocommerce'
						)}
						onChange={(val) => setAttributes({ description: val })}
						allowedFormats={['core/italic']}
					/>
				)}
			</div>
		</>
	);
};
