import { ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

const UPGRADE_URL = 'https://themegrill.com/plugins/registration-form-for-woocommerce/';

const CrownIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="m2 4 3 12h14l3-12-6 5-4-5-4 5-6-5zm3 16h14" />
	</svg>
);

export default createHigherOrderComponent((Component) => {
	return (props) => {
		if (
			[
				'tgwcfb/checkbox',
				'tgwcfb/input',
				'tgwcfb/number',
				'tgwcfb/multi-select',
				'tgwcfb/radio',
				'tgwcfb/range',
				'tgwcfb/select',
				'tgwcfb/textarea',
				'tgwcfb/time-picker',
				'tgwcfb/profile-picture',
				'tgwcfb/date-picker',
				'tgwcfb/secondary-email',
				'tgwcfb/email',
				'tgwcfb/phone',
				'tgwcfb/display-name',
				'tgwcfb/first-name',
				'tgwcfb/last-name',
				'tgwcfb/nickname',
				'tgwcfb/description',
				'tgwcfb/url',
			].includes(props.name)
		) {
			return (
				<>
					<Component {...props} />
					<div className="tgwcfb-pro" style={{ display: 'block', cursor: 'not-allowed', marginBottom: '20px' }}>
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
							<ToggleControl
								label={__('Read only', 'registration-form-for-woocommerce')}
								disabled
							/>
						</div>
					</div>
				</>
			);
		}
		return <Component {...props} />;
	};
}, 'withReadOnlyInspectorControl');
