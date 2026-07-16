import { BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const UPGRADE_URL = 'https://themegrill.com/plugins/registration-form-for-woocommerce/';

const CrownIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="11"
		height="11"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="m2 4 3 12h14l3-12-6 5-4-5-4 5-6-5zm3 16h14" />
	</svg>
);

const LockedField = ({ label }) => {
	const [showPopup, setShowPopup] = useState(false);

	return (
		<div style={{ marginBottom: '28px' }}>
			<BaseControl className="tgwcfb-setting">
				<BaseControl.VisualLabel className="no-margin">
					<span style={{ opacity: 0.5 }}>{label}</span>
					<span
						className="tgwcfb-pro"
						style={{ marginLeft: '6px' }}
						onMouseEnter={() => setShowPopup(true)}
						onMouseLeave={() => setShowPopup(false)}
					>
						<span className="tgwcfb-pro__crown" aria-hidden="true">
							<CrownIcon />
						</span>
						<span
							className="tgwcfb-pro__popup"
							role="tooltip"
							style={{
								opacity: showPopup ? 1 : 0,
								visibility: showPopup ? 'visible' : 'hidden',
								pointerEvents: showPopup ? 'auto' : 'none',
								transform: showPopup
									? 'translateX(-50%) translateY(0)'
									: 'translateX(-50%) translateY(6px)',
							}}
							onMouseEnter={() => setShowPopup(true)}
							onMouseLeave={() => setShowPopup(false)}
						>
							<span className="tgwcfb-pro__popup-msg">
								{__('This is a premium feature, please Upgrade to Pro.', 'registration-form-for-woocommerce')}
							</span>
							<a
								className="tgwcfb-pro__popup-btn"
								href={UPGRADE_URL}
								target="_blank"
								rel="noopener noreferrer"
								style={{ fontWeight: 500 }}
							>
								<span className="tgwcfb-pro__popup-btn-icon">
									<CrownIcon />
								</span>
								{__('Upgrade to Pro', 'registration-form-for-woocommerce')}
							</a>
						</span>
					</span>
				</BaseControl.VisualLabel>
				<div
					style={{
						height: '38px',
						borderRadius: '4px',
						border: '1px solid #E1E1E1',
						opacity: 0.5,
						pointerEvents: 'none',
					}}
				/>
			</BaseControl>
		</div>
	);
};

export default () => (
	<div>
		<LockedField label={__('Webhook URL', 'registration-form-for-woocommerce')} />
		<LockedField
			label={__('Webhook Secret', 'registration-form-for-woocommerce')}
		/>
	</div>
);
