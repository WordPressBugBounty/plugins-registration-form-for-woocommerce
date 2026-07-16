export default (props) => {
	const {
		attributes: {
			label,
			description,
			placeholder,
			hideLabel,
			required,
			className,
			hasDescription,
			fieldWidth,
		},
	} = props;

	return (
		<p
			id="reg_confirm_password_field"
			className={`form-row field-width-${fieldWidth}${
				className && ' ' + className
			}`}
		>
			<label
				htmlFor="reg_confirm_password"
				style={hideLabel ? { display: 'none' } : {}}
			>
				{label} {required && <span className="required">*</span>}
			</label>
			<span className="password-input">
				<input
					type="password"
					placeholder={placeholder}
					className="input-text"
					name="confirm_password"
					id="reg_confirm_password"
					autoComplete="new-password"
				/>
				{description && hasDescription && (
					<span
						className="input-description"
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				)}
			</span>
		</p>
	);
};
