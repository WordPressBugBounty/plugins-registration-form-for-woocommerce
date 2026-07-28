import {
	ExternalLink,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';

const UPGRADE_URL = 'https://themegrill.com/plugins/registration-form-for-woocommerce/';

const CrownIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="m2 4 3 12h14l3-12-6 5-4-5-4 5-6-5zm3 16h14" />
	</svg>
);

export default compose([
	withSelect((select) => ({
		postMeta: select('core/editor').getEditedPostAttribute('meta'),
	})),
	withDispatch((dispatch) => ({
		setPostMeta: (newMeta) => {
			dispatch('core/editor').editPost({ meta: newMeta });
		},
	})),
])((props) => {
	const { setPostMeta, postMeta } = props;
	const userRoles = window?._TGWCFB_EDITOR_?.userRoles || {};
	const captchaType = window?._TGWCFB_EDITOR_?.captchaType || 'v2';
	return (
		<PluginDocumentSettingPanel
			name="_tgwcfb_settings"
			className="tgwcfb_settings"
			title={__('Settings', 'registration-form-for-woocommerce')}
			initialOpen={true}
		>
			<TextControl
				type="url"
				label={__('Redirect URL', 'registration-form-for-woocommerce')}
				help={__(
					'Redirect to certain url after successful registration',
					'registration-form-for-woocommerce'
				)}
				value={postMeta._tgwcfb_redirect_url}
				onChange={(val) =>
					setPostMeta({ ...postMeta, _tgwcfb_redirect_url: val })
				}
			/>
			<TextControl
				type="url"
				label={__(
					'Form submit button text',
					'registration-form-for-woocommerce'
				)}
				value={postMeta._tgwcfb_submit_btn_text}
				onChange={(val) =>
					setPostMeta({ ...postMeta, _tgwcfb_submit_btn_text: val })
				}
			/>
			{captchaType === 'v2' && (
				<>
					<ToggleControl
						label={__(
							'reCaptcha v2 support',
							'registration-form-for-woocommerce'
						)}
						help={
							<>
								{__(
									'Enable Captcha for strong security from spams and bots, setup ',
									'registration-form-for-woocommerce'
								)}
								<ExternalLink
									href={
										window._TGWCFB_EDITOR_.adminURL +
										'edit.php?post_type=tgwcfb_form&page=settings/#general-settings'
									}
								>
									{__(
										'Google reCaptcha Settings',
										'registration-form-for-woocommerce'
									)}
								</ExternalLink>
							</>
						}
						checked={postMeta._tgwcfb_recaptcha_v2}
						onChange={() =>
							setPostMeta({
								...postMeta,
								_tgwcfb_recaptcha_v2: !postMeta._tgwcfb_recaptcha_v2,
							})
						}
					/>
					{postMeta._tgwcfb_recaptcha_v2 && (
						<ToggleControl
							label={__(
								'Use as invisible',
								'registration-form-for-woocommerce'
							)}
							help={
								<>
									{__(
										'Enable Invisible reCAPTCHA v2 if you prefer image selection challenges instead of the checkbox.',
										'registration-form-for-woocommerce'
									)}
								</>
							}
							checked={postMeta._tgwcfb_recaptcha_v2_as_invisible}
							onChange={() =>
								setPostMeta({
									...postMeta,
									_tgwcfb_recaptcha_v2_as_invisible:
										!postMeta._tgwcfb_recaptcha_v2_as_invisible,
								})
							}
						/>
					)}
				</>
			)}

			{captchaType === 'v3' && (
				<ToggleControl
					label={__(
						'reCaptcha v3 support',
						'registration-form-for-woocommerce'
					)}
					help={
						<>
							{__(
								'Enable Captcha for strong security from spams and bots, setup ',
								'registration-form-for-woocommerce'
							)}
							<ExternalLink
								href={
									window._TGWCFB_EDITOR_.adminURL +
									'edit.php?post_type=tgwcfb_form&page=settings/#general-settings'
								}
							>
								{__(
									'Google reCaptcha Settings',
									'registration-form-for-woocommerce'
								)}
							</ExternalLink>
						</>
					}
					checked={postMeta._tgwcfb_recaptcha_v3}
					onChange={() =>
						setPostMeta({
							...postMeta,
							_tgwcfb_recaptcha_v3: !postMeta._tgwcfb_recaptcha_v3,
						})
					}
				/>
			)}
			{captchaType === 'hcaptcha' && (
				<ToggleControl
					label={__('hCaptcha support', 'registration-form-for-woocommerce')}
					help={
						<>
							{__(
								'Enable Captcha for strong security from spams and bots, setup ',
								'registration-form-for-woocommerce'
							)}
							<ExternalLink
								href={
									window._TGWCFB_EDITOR_.adminURL +
									'edit.php?post_type=tgwcfb_form&page=settings/#general-settings'
								}
							>
								{__('hCaptcha Settings', 'registration-form-for-woocommerce')}
							</ExternalLink>
						</>
					}
					checked={postMeta._tgwcfb_hcaptcha}
					onChange={() =>
						setPostMeta({
							...postMeta,
							_tgwcfb_hcaptcha: !postMeta._tgwcfb_hcaptcha,
						})
					}
				/>
			)}
			<div className="tgwcfb-pro" style={{ display: 'block', cursor: 'not-allowed' }}>
				<span className="tgwcfb-pro__crown" aria-hidden="true" style={{ position: 'absolute', top: '2px', right: '0' }}>
					<CrownIcon />
				</span>
				<span className="tgwcfb-pro__popup" role="tooltip">
					<span className="tgwcfb-pro__popup-msg">
						{__('This is a premium feature, please Upgrade to Pro.', 'registration-form-for-woocommerce')}
					</span>
					<a
						className="tgwcfb-pro__popup-btn"
						href={UPGRADE_URL}
						target="_blank"
						rel="noreferrer"
						style={{ fontWeight: 500 }}
					>
						<span className="tgwcfb-pro__popup-btn-icon">
							<CrownIcon />
						</span>
						{__('Upgrade to Pro', 'registration-form-for-woocommerce')}
					</a>
				</span>
				<div style={{ opacity: 0.5, pointerEvents: 'none' }}>
					<SelectControl
						label={__(
							'User approval option',
							'registration-form-for-woocommerce'
						)}
						options={[{ label: 'Auto approval & auto login', value: '' }]}
						disabled
					/>
					<ToggleControl
						label={__('Assign user role', 'registration-form-for-woocommerce')}
						help={__(
							'Auto assign role to registered users through this form, if enabled it will ignore the User Role field',
							'registration-form-for-woocommerce'
						)}
						disabled
					/>
				</div>
			</div>
		</PluginDocumentSettingPanel>
	);
});
