export default (props) => {
	const {
		attributes: {
			label,
			description,
			placeholder,
			hideLabel,
			required,
			className,
			fieldWidth,
			confirmEmail,
			confirmEmailLabel,
			confirmEmailPlaceholder,
		},
	} = props;

	return (
		<>
			<p
				id="reg_email_field"
				className={`form-row field-width-${fieldWidth}${
					className && ' ' + className
				}`}
			>
				<label htmlFor="reg_email" style={hideLabel ? { display: 'none' } : {}}>
					{label} {required && <span className="required">*</span>}
				</label>
				<input
					type="email"
					placeholder={placeholder}
					className="input-text"
					name="email"
					id="reg_email"
					autoComplete="email"
				/>
				{description && (
					<span
						className="input-description"
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				)}
			</p>
			{confirmEmail && (
				<p
					id="reg_confirm_email_field"
					className={`form-row field-width-${fieldWidth}`}
				>
					<label
						htmlFor="reg_confirm_email"
						style={hideLabel ? { display: 'none' } : {}}
					>
						{confirmEmailLabel}{' '}
						{required && <span className="required">*</span>}
					</label>
					<input
						type="email"
						placeholder={confirmEmailPlaceholder}
						className="input-text"
						name="confirm_email"
						id="reg_confirm_email"
						autoComplete="email"
					/>
				</p>
			)}
		</>
	);
};
