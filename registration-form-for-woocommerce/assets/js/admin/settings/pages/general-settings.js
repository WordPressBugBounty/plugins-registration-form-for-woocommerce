import {
	BaseControl,
	Button,
	ExternalLink,
	Spinner,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { Tooltip } from '../components';

const RecaptchaIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="28"
		viewBox="0 0 28 28"
		fill="none"
	>
		<path
			d="M28.0002 13.9386C28.0002 13.7369 27.9933 13.5387 27.9865 13.3404V2.00978L24.8556 5.14408C22.2921 2.00294 18.3922 0 14.024 0C9.47807 0 5.43801 2.17042 2.88477 5.53031L8.01859 10.7188C8.52103 9.78913 9.23539 8.98932 10.0967 8.38433C10.9922 7.68365 12.2637 7.11284 14.0206 7.11284C14.2325 7.11284 14.3966 7.13677 14.5162 7.18462C16.6935 7.35552 18.5802 8.55865 19.691 10.3018L16.0577 13.9352C20.6617 13.9181 25.8639 13.9078 28.0002 13.9386Z"
			fill="#1C3AA9"
		/>
		<path
			d="M13.942 0C13.7403 0 13.5421 0.00683598 13.3438 0.013672H2.00978L5.14408 3.14455C2.00636 5.71146 0 9.61139 0 13.9796C0 18.5255 2.17042 22.5656 5.53031 25.1188L10.7188 19.985C9.78913 19.4826 8.98932 18.7682 8.38433 17.9069C7.68364 17.0113 7.11284 15.7399 7.11284 13.983C7.11284 13.7711 7.13677 13.607 7.18462 13.4874C7.35552 11.3101 8.55865 9.4234 10.3018 8.31256L13.9352 11.9459C13.9215 7.33843 13.9078 2.13966 13.942 0Z"
			fill="#4285F4"
		/>
		<path
			d="M0.00390625 13.9796C0.00390625 14.1812 0.0107419 14.3795 0.0175779 14.5777V25.9084L3.14846 22.7775C5.71195 25.9152 9.61188 27.9182 13.9801 27.9182C18.526 27.9182 22.5661 25.7477 25.1193 22.3878L19.9855 17.1993C19.483 18.129 18.7687 18.9288 17.9073 19.5338C17.0118 20.2345 15.7403 20.8053 13.9835 20.8053C13.7716 20.8053 13.6075 20.7814 13.4879 20.7335C11.3106 20.5626 9.42389 19.3595 8.31304 17.6163L11.9464 13.983C7.34234 14.0001 2.14015 14.0103 0.00390625 13.9796Z"
			fill="#ABABAB"
		/>
	</svg>
);

const HcaptchaIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="29"
		viewBox="0 0 28 29"
		fill="none"
	>
		<g clip-path="url(#clip0_13503_1136)">
			<path
				opacity="0.5"
				d="M20.9979 24.6253H17.498V28.1431H20.9979V24.6253Z"
				fill="#0074BF"
			/>
			<path
				opacity="0.7"
				d="M17.4999 24.6253H14V28.1431H17.4999V24.6253Z"
				fill="#0074BF"
			/>
			<path
				opacity="0.7"
				d="M13.9999 24.6253H10.5V28.1431H13.9999V24.6253Z"
				fill="#0074BF"
			/>
			<path
				opacity="0.5"
				d="M10.4999 24.6253H7V28.1431H10.4999V24.6253Z"
				fill="#0074BF"
			/>
			<path
				opacity="0.7"
				d="M24.4999 21.1075H21V24.6253H24.4999V21.1075Z"
				fill="#0082BF"
			/>
			<path
				opacity="0.8"
				d="M20.9979 21.1075H17.498V24.6253H20.9979V21.1075Z"
				fill="#0082BF"
			/>
			<path d="M17.4999 21.1075H14V24.6253H17.4999V21.1075Z" fill="#0082BF" />
			<path d="M13.9999 21.1075H10.5V24.6253H13.9999V21.1075Z" fill="#0082BF" />
			<path
				opacity="0.8"
				d="M10.4999 21.1075H7V24.6253H10.4999V21.1075Z"
				fill="#0082BF"
			/>
			<path
				opacity="0.7"
				d="M6.99989 21.1075H3.5V24.6253H6.99989V21.1075Z"
				fill="#0082BF"
			/>
			<path
				opacity="0.5"
				d="M27.9999 17.5892H24.5V21.107H27.9999V17.5892Z"
				fill="#008FBF"
			/>
			<path
				opacity="0.8"
				d="M24.4999 17.5892H21V21.107H24.4999V17.5892Z"
				fill="#008FBF"
			/>
			<path
				d="M20.9979 17.5892H17.498V21.107H20.9979V17.5892Z"
				fill="#008FBF"
			/>
			<path d="M17.4999 17.5892H14V21.107H17.4999V17.5892Z" fill="#008FBF" />
			<path d="M13.9999 17.5892H10.5V21.107H13.9999V17.5892Z" fill="#008FBF" />
			<path d="M10.4999 17.5892H7V21.107H10.4999V17.5892Z" fill="#008FBF" />
			<path
				opacity="0.8"
				d="M6.99989 17.5892H3.5V21.107H6.99989V17.5892Z"
				fill="#008FBF"
			/>
			<path
				opacity="0.5"
				d="M3.49989 17.5892H0V21.107H3.49989V17.5892Z"
				fill="#008FBF"
			/>
			<path
				opacity="0.7"
				d="M27.9999 14.0715H24.5V17.5892H27.9999V14.0715Z"
				fill="#009DBF"
			/>
			<path d="M24.4999 14.0715H21V17.5892H24.4999V14.0715Z" fill="#009DBF" />
			<path
				d="M20.9979 14.0715H17.498V17.5892H20.9979V14.0715Z"
				fill="#009DBF"
			/>
			<path d="M17.4999 14.0715H14V17.5892H17.4999V14.0715Z" fill="#009DBF" />
			<path d="M13.9999 14.0715H10.5V17.5892H13.9999V14.0715Z" fill="#009DBF" />
			<path d="M10.4999 14.0715H7V17.5892H10.4999V14.0715Z" fill="#009DBF" />
			<path d="M6.99989 14.0715H3.5V17.5892H6.99989V14.0715Z" fill="#009DBF" />
			<path
				opacity="0.7"
				d="M3.49989 14.0715H0V17.5892H3.49989V14.0715Z"
				fill="#009DBF"
			/>
			<path
				opacity="0.7"
				d="M27.9999 10.5537H24.5V14.0714H27.9999V10.5537Z"
				fill="#00ABBF"
			/>
			<path d="M24.4999 10.5537H21V14.0714H24.4999V10.5537Z" fill="#00ABBF" />
			<path
				d="M20.9979 10.5537H17.498V14.0714H20.9979V10.5537Z"
				fill="#00ABBF"
			/>
			<path d="M17.4999 10.5537H14V14.0714H17.4999V10.5537Z" fill="#00ABBF" />
			<path d="M13.9999 10.5537H10.5V14.0714H13.9999V10.5537Z" fill="#00ABBF" />
			<path d="M10.4999 10.5537H7V14.0714H10.4999V10.5537Z" fill="#00ABBF" />
			<path d="M6.99989 10.5537H3.5V14.0714H6.99989V10.5537Z" fill="#00ABBF" />
			<path
				opacity="0.7"
				d="M3.49989 10.5537H0V14.0714H3.49989V10.5537Z"
				fill="#00ABBF"
			/>
			<path
				opacity="0.5"
				d="M27.9999 7.03596H24.5V10.5537H27.9999V7.03596Z"
				fill="#00B9BF"
			/>
			<path
				opacity="0.8"
				d="M24.4999 7.03596H21V10.5537H24.4999V7.03596Z"
				fill="#00B9BF"
			/>
			<path
				d="M20.9979 7.03596H17.498V10.5537H20.9979V7.03596Z"
				fill="#00B9BF"
			/>
			<path d="M17.4999 7.03596H14V10.5537H17.4999V7.03596Z" fill="#00B9BF" />
			<path d="M13.9999 7.03596H10.5V10.5537H13.9999V7.03596Z" fill="#00B9BF" />
			<path d="M10.4999 7.03596H7V10.5537H10.4999V7.03596Z" fill="#00B9BF" />
			<path
				opacity="0.8"
				d="M6.99989 7.03596H3.5V10.5537H6.99989V7.03596Z"
				fill="#00B9BF"
			/>
			<path
				opacity="0.5"
				d="M3.49989 7.03596H0V10.5537H3.49989V7.03596Z"
				fill="#00B9BF"
			/>
			<path
				opacity="0.7"
				d="M24.4999 3.51767H21V7.03541H24.4999V3.51767Z"
				fill="#00C6BF"
			/>
			<path
				opacity="0.8"
				d="M20.9979 3.51767H17.498V7.03541H20.9979V3.51767Z"
				fill="#00C6BF"
			/>
			<path d="M17.4999 3.51767H14V7.03541H17.4999V3.51767Z" fill="#00C6BF" />
			<path d="M13.9999 3.51767H10.5V7.03541H13.9999V3.51767Z" fill="#00C6BF" />
			<path
				opacity="0.8"
				d="M10.4999 3.51767H7V7.03541H10.4999V3.51767Z"
				fill="#00C6BF"
			/>
			<path
				opacity="0.7"
				d="M6.99989 3.51767H3.5V7.03541H6.99989V3.51767Z"
				fill="#00C6BF"
			/>
			<path
				opacity="0.5"
				d="M20.9979 -6.10352e-05H17.498V3.51768H20.9979V-6.10352e-05Z"
				fill="#00D4BF"
			/>
			<path
				opacity="0.7"
				d="M17.4999 -6.10352e-05H14V3.51768H17.4999V-6.10352e-05Z"
				fill="#00D4BF"
			/>
			<path
				opacity="0.7"
				d="M13.9999 -6.10352e-05H10.5V3.51768H13.9999V-6.10352e-05Z"
				fill="#00D4BF"
			/>
			<path
				opacity="0.5"
				d="M10.4999 -6.10352e-05H7V3.51768H10.4999V-6.10352e-05Z"
				fill="#00D4BF"
			/>
			<path
				d="M9.21594 12.9617L10.1912 10.7678C10.5465 10.2054 10.4995 9.51628 10.1105 9.12535C10.0586 9.07327 10.0012 9.02709 9.93926 8.98765C9.80583 8.90536 9.65616 8.85329 9.50066 8.83505C9.34517 8.81681 9.18759 8.83285 9.03889 8.88205C8.7012 8.9876 8.41267 9.21194 8.22618 9.51394C8.22618 9.51394 6.89101 12.6448 6.39409 14.0522C5.89717 15.4595 6.09571 18.0402 8.01139 19.9697C10.0432 22.0119 12.9852 22.4786 14.8614 21.0631C14.9399 21.0235 15.0136 20.9752 15.0814 20.919L20.8633 16.0663C21.1442 15.8329 21.5599 15.3521 21.1866 14.8037C20.8226 14.2686 20.133 14.6327 19.8514 14.8136L16.524 17.2455C16.5084 17.2584 16.4904 17.2681 16.471 17.2738C16.4516 17.2796 16.4313 17.2814 16.4113 17.279C16.3912 17.2767 16.3718 17.2703 16.3543 17.2602C16.3367 17.2501 16.3214 17.2366 16.3092 17.2204C16.2244 17.116 16.2093 16.8394 16.3423 16.7297L21.4432 12.3788C21.8838 11.9797 21.9453 11.3997 21.5883 11.0024C21.24 10.6132 20.6868 10.6249 20.2421 11.0275L15.6497 14.6362C15.6282 14.6538 15.6034 14.6669 15.5767 14.6745C15.55 14.6821 15.5221 14.6842 15.4946 14.6806C15.4671 14.677 15.4406 14.6678 15.4168 14.6535C15.393 14.6393 15.3723 14.6203 15.356 14.5977C15.2654 14.4956 15.2306 14.3212 15.3328 14.219L20.5341 9.14577C20.7311 8.96104 20.8472 8.70528 20.8568 8.43464C20.8663 8.164 20.7687 7.90061 20.5852 7.70227C20.4942 7.60596 20.3846 7.52932 20.2632 7.47705C20.1417 7.42478 20.0109 7.39798 19.8787 7.39828C19.6066 7.39532 19.3443 7.50011 19.1485 7.69002L13.8339 12.7079C13.7068 12.8356 13.4577 12.7079 13.4275 12.5585C13.422 12.5318 13.4233 12.5041 13.4312 12.478C13.4391 12.4519 13.4534 12.4282 13.4728 12.4091L17.541 7.75361C17.6393 7.66144 17.7182 7.55033 17.773 7.42689C17.8277 7.30345 17.8571 7.17021 17.8596 7.03509C17.862 6.89998 17.8374 6.76574 17.7872 6.64038C17.737 6.51502 17.6622 6.4011 17.5673 6.30538C17.4724 6.20967 17.3593 6.13412 17.2347 6.08324C17.1101 6.03235 16.9767 6.00717 16.8422 6.00919C16.7078 6.01121 16.5751 6.04039 16.4521 6.09499C16.3292 6.1496 16.2184 6.22851 16.1263 6.32703L9.95725 13.1822C9.73608 13.4045 9.41041 13.4156 9.25542 13.2867C9.20773 13.2485 9.17686 13.1931 9.16947 13.1323C9.16209 13.0715 9.17878 13.0102 9.21594 12.9617Z"
				fill="white"
			/>
		</g>
		<defs>
			<clipPath id="clip0_13503_1136">
				<rect width="28" height="28.1431" fill="white" />
			</clipPath>
		</defs>
	</svg>
);

export default () => {
	const {
		secretKey,
		siteKey,
		recaptchaV3SiteKey,
		recaptchaV3SecreteKey,
		hcaptchaSiteKey,
		hcaptchaSecreteKey,
		captchaType,
		hasData,
	} = useSelect((select) => {
		// eslint-disable-next-line no-shadow
		const {
			getSecretKey,
			getSiteKey,
			getRecaptchaV3SiteKey,
			getRecaptchaV3SecreteKey,
			getHCaptchaSiteKey,
			getHCaptchaSecreteKey,
			getCaptchaType,
			hasData,
		} = select('tgwcfb/settings');
		return {
			secretKey: getSecretKey(),
			siteKey: getSiteKey(),
			recaptchaV3SiteKey: getRecaptchaV3SiteKey(),
			recaptchaV3SecreteKey: getRecaptchaV3SecreteKey(),
			hcaptchaSiteKey: getHCaptchaSiteKey(),
			hcaptchaSecreteKey: getHCaptchaSecreteKey(),
			captchaType: getCaptchaType(),
			hasData: hasData(),
		};
	});
	const {
		setSecretKey,
		setSiteKey,
		setRecaptchaV3SiteKey,
		setRecaptchaV3SecreteKey,
		setHCaptchaSiteKey,
		setHCaptchaSecreteKey,
		setCaptchaType,
	} = useDispatch('tgwcfb/settings');

	if (!hasData) {
		return <Spinner />;
	}

	return (
		<>
			<BaseControl className="tgwcfb-setting">
				<BaseControl.VisualLabel>
					{__('Captcha Type', 'registration-form-for-woocommerce')}
					<Tooltip
						content={
							<>
								{__(
									'Select the captcha type which apply to the form',
									'registration-form-for-woocommerce'
								)}
							</>
						}
						width={215}
					>
						<Button icon="info-outline" />
					</Tooltip>
				</BaseControl.VisualLabel>

				<ToggleGroupControl
					value={captchaType}
					isBlock
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					onChange={(value) => setCaptchaType(value)}
					id="tgwcfb-captcha-type"
					className="tgwcfb-setting tgwcfb-captcha"
				>
					<ToggleGroupControlOption
						className="tgwcfb-recaptcha"
						value="v2"
						label={
							<span
								className="recaptcha-v2"
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '12px',
									justifyContent: 'flex-start',
									padding: '12px',
									fontSize: '14px',
								}}
							>
								<RecaptchaIcon />
								<span>reCAPTCHA V2</span>
							</span>
						}
					/>
					<ToggleGroupControlOption
						className="tgwcfb-recaptcha"
						value="v3"
						label={
							<span
								className="recaptcha-v3"
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-start',
									gap: '12px',
									padding: '12px',
									fontSize: '14px',
								}}
							>
								<RecaptchaIcon />
								<span>reCAPTCHA V3</span>
							</span>
						}
					/>
					<ToggleGroupControlOption
						className="tgwcfb-recaptcha"
						value="hcaptcha"
						label={
							<span
								className="hcaptcha"
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '12px',
									justifyContent: 'flex-start',
									padding: '12px',
									fontSize: '14px',
								}}
							>
								<HcaptchaIcon />
								<span>hCAPTCHA</span>
							</span>
						}
					/>
				</ToggleGroupControl>
			</BaseControl>

			{captchaType === 'v2' && (
				<BaseControl className="tgwcfb-setting">
					<BaseControl.VisualLabel>
						{__(
							'Google reCaptcha v2 settings',
							'registration-form-for-woocommerce'
						)}
						<Tooltip
							content={
								<>
									{__(
										'Get site key and secret key from ',
										'registration-form-for-woocommerce'
									)}
									<ExternalLink href="https://google.com/recaptcha ">
										{__('Google reCaptcha')}
									</ExternalLink>
								</>
							}
							width={215}
						>
							<Button icon="info-outline" />
						</Tooltip>
					</BaseControl.VisualLabel>
					<BaseControl
						className="tgwcfb-setting"
						label={__('Site key', 'registration-form-for-woocommerce')}
						id="tgwcfb-site-key"
					>
						<input
							className="components-text-control__input"
							type="text"
							id="tgwcfb-site-key"
							defaultValue={siteKey}
							onChange={(e) => setSiteKey(e.currentTarget.value)}
						/>
					</BaseControl>
					<BaseControl
						className="tgwcfb-setting"
						label={__('Secret key', 'registration-form-for-woocommerce')}
						id="tgwcfb-secret-key"
					>
						<input
							className="components-text-control__input"
							type="text"
							id="tgwcfb-secret-key"
							defaultValue={secretKey}
							onChange={(e) => setSecretKey(e.currentTarget.value)}
						/>
					</BaseControl>
				</BaseControl>
			)}

			{captchaType === 'v3' && (
				<BaseControl className="tgwcfb-setting">
					<BaseControl.VisualLabel>
						{__(
							'Google reCaptcha v3 settings',
							'registration-form-for-woocommerce'
						)}
						<Tooltip
							content={
								<>
									{__(
										'Get site key and secret key from ',
										'registration-form-for-woocommerce'
									)}
									<ExternalLink href="https://google.com/recaptcha ">
										{__('Google reCaptcha')}
									</ExternalLink>
								</>
							}
							width={215}
						>
							<Button icon="info-outline" />
						</Tooltip>
					</BaseControl.VisualLabel>
					<BaseControl
						className="tgwcfb-setting"
						label={__('Site key', 'registration-form-for-woocommerce')}
						id="tgwcfb-recaptcha-v3-site-key"
					>
						<input
							className="components-text-control__input"
							type="text"
							id="tgwcfb-recaptcha-v3-site-key"
							defaultValue={recaptchaV3SiteKey}
							onChange={(e) => setRecaptchaV3SiteKey(e.currentTarget.value)}
						/>
					</BaseControl>
					<BaseControl
						className="tgwcfb-setting"
						label={__('Secret key', 'registration-form-for-woocommerce')}
						id="tgwcfb-recaptcha-v3-secret-key"
					>
						<input
							className="components-text-control__input"
							type="text"
							id="tgwcfb-recaptcha-v3-secret-key"
							defaultValue={recaptchaV3SecreteKey}
							onChange={(e) => setRecaptchaV3SecreteKey(e.currentTarget.value)}
						/>
					</BaseControl>
				</BaseControl>
			)}

			{captchaType === 'hcaptcha' && (
				<BaseControl className="tgwcfb-setting">
					<BaseControl.VisualLabel>
						{__('hCaptcha settings', 'registration-form-for-woocommerce')}
						<Tooltip
							content={
								<>
									{__(
										'Get site key and secret key from ',
										'registration-form-for-woocommerce'
									)}
									<ExternalLink href="https://www.hcaptcha.com/">
										{__('hCaptcha')}
									</ExternalLink>
								</>
							}
							width={215}
						>
							<Button icon="info-outline" />
						</Tooltip>
					</BaseControl.VisualLabel>
					<BaseControl
						className="tgwcfb-setting"
						label={__('Site key', 'registration-form-for-woocommerce')}
						id="tgwcfb-hcaptcha-site-key"
					>
						<input
							className="components-text-control__input"
							type="text"
							id="tgwcfb-hcaptcha-site-key"
							defaultValue={hcaptchaSiteKey}
							onChange={(e) => setHCaptchaSiteKey(e.currentTarget.value)}
						/>
					</BaseControl>
					<BaseControl
						className="tgwcfb-setting"
						label={__('Secret key', 'registration-form-for-woocommerce')}
						id="tgwcfb-hcaptcha-secret-key"
					>
						<input
							className="components-text-control__input"
							type="text"
							id="tgwcfb-hcaptcha-secret-key"
							defaultValue={hcaptchaSecreteKey}
							onChange={(e) => setHCaptchaSecreteKey(e.currentTarget.value)}
						/>
					</BaseControl>
				</BaseControl>
			)}
		</>
	);
};
