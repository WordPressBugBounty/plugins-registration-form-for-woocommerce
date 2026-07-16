import { RichText } from '@wordpress/block-editor';

export default ( props ) => {
	const {
		attributes: {
			clientId,
			label,
			description,
			hideLabel,
			required,
			className,
			hasDescription,
			fieldWidth,
			agreementText,
			checkedByDefault,
		},
	} = props;

	return (
		<div id={ `gdpr_agreement_${ clientId }_field` } className={ `form-row field-width-${ fieldWidth }${ className && ( ' ' + className ) }` }>
			<label htmlFor={ `gdpr_agreement_${ clientId }` } style={ hideLabel ? { display: 'none' } : {} }>{ label } { required && ( <span className="required">*</span> ) }</label>
			<div className="tgwcfb-gdpr-agreement" style={ { display: 'flex', alignItems: 'center', gap: '12px'} }>
				<input
					type="checkbox"
					name={ `gdpr_agreement_${ clientId }` }
					id={ `gdpr_agreement_${ clientId }` }
					value="1"
					checked={ checkedByDefault }
				/>
				   <RichText.Content
					   className="tgwcfb-agreement-text"
					   tagName="span"
					   value={ agreementText || 'I consent to the use of my submitted information to respond to my inquiry.' }
				   />
			</div>
			{ description && hasDescription && (
				<span className="input-description" dangerouslySetInnerHTML={ { __html: description } } />
			) }
		</div>
	);
};
