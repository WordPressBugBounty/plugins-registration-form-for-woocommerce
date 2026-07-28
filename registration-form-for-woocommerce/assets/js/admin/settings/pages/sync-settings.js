import { parse } from '@wordpress/block-serialization-default-parser';
import {
	BaseControl,
	Button,
	ExternalLink,
	SelectControl,
	Spinner,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import _ from 'lodash';

import { Tooltip } from '../components';

const CHECKOUT_BLOCKS = [
	'tgwcfb/user-roles',
	'tgwcfb/input',
	'tgwcfb/textarea',
	'tgwcfb/date-picker',
	'tgwcfb/time-picker',
	'tgwcfb/number',
	'tgwcfb/checkbox',
	'tgwcfb/radio',
	'tgwcfb/select',
	'tgwcfb/multi-select',
	'tgwcfb/range',
	'tgwcfb/profile-picture',
	'tgwcfb/first-name',
	'tgwcfb/last-name',
	'tgwcfb/display-name',
	'tgwcfb/nickname',
	'tgwcfb/url',
	'tgwcfb/description',
	'tgwcfb/phone',
	'tgwcfb/secondary-email',
	'tgwcfb/gdpr-agreement',
];

const WC_ACCOUNT_SETTINGS_URL =
	window._TGWCFB_SETTINGS_.adminURL + 'admin.php?page=wc-settings&tab=account';

const UPGRADE_URL =
	'https://themegrill.com/plugins/registration-form-for-woocommerce/';

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

export default () => {
	const { forms, hasData, checkoutFields, checkoutFormId, formId } = useSelect(
		(select) => {
			// eslint-disable-next-line no-shadow
			const {
				getForms,
				getSettings,
				hasData,
				getCheckoutFormId,
				getCheckoutFields,
				getFormId,
			} = select('tgwcfb/settings');
			return {
				forms: getForms(),
				settings: getSettings(),
				hasData: hasData(),
				checkoutFields: getCheckoutFields(),
				checkoutFormId: getCheckoutFormId(),
				formId: getFormId(),
			};
		}
	);

	const { setFormId, setCheckoutFields, setCheckoutFormId } =
		useDispatch('tgwcfb/settings');

	const [checkoutProPopup, setCheckoutProPopup] = useState(false);

	const fields = useCallback(() => {
		if (0 === checkoutFormId) {
			return [[], []];
		}
		const content =
			(forms || []).filter((f) => f.ID === checkoutFormId)?.[0]?.post_content ||
			'';
		const blocks = parse(content).filter(
			(b) => b.blockName && CHECKOUT_BLOCKS.includes(b.blockName)
		);

		return [[...blocks], blocks.filter((b) => !!b.attrs?.required)];
	}, [checkoutFormId, hasData]);

	const [allFields, requiredFields] = fields();

	useEffect(() => {
		const currRequiredFields = checkoutFields.filter(
			(f) => !!f.attrs?.required
		);
		const currRequiredFieldsWithClientId = currRequiredFields.filter(
			(c) => !!c.attrs?.clientId
		);
		const currRequiredFieldsWithoutClientId = currRequiredFields.filter(
			(c) => !c.attrs?.clientId
		);
		const requiredFieldsWithClientId = requiredFields.filter(
			(r) => !!r.attrs?.clientId
		);
		const requiredFieldsWithoutClientId = requiredFields.filter(
			(r) => !r.attrs?.clientId
		);

		const fieldDiffWithClientId = requiredFieldsWithClientId.filter(
			(r) =>
				!currRequiredFieldsWithClientId.some(
					(c) => c.attrs.clientId === r.attrs.clientId
				)
		);
		const fieldDiffWithoutClientId = requiredFieldsWithoutClientId.filter(
			(r) =>
				!currRequiredFieldsWithoutClientId.some(
					(c) => c.blockName === r.blockName
				)
		);
		if (
			!_.isEmpty(fieldDiffWithClientId) ||
			!_.isEmpty(fieldDiffWithoutClientId)
		) {
			let temp = [
				...checkoutFields,
				...fieldDiffWithClientId,
				...fieldDiffWithoutClientId,
			];
			temp = _.sortBy(temp, (t) => {
				if (t.attrs?.clientId) {
					return allFields.findIndex(
						(f) => t.attrs.clientId === f.attrs?.clientId
					);
				}
				return allFields.findIndex((f) => t.blockName === f.blockName);
			});
			setCheckoutFields(temp);
		}
	}, [checkoutFields]);

	if (!hasData) {
		return <Spinner />;
	}

	return (
		<>
			<div style={{ marginBottom: '28px' }}>
				<BaseControl className="tgwcfb-setting">
					<BaseControl.VisualLabel className="no-margin">
						{__(
							'Replace WooCommerce registration form',
							'registration-form-for-woocommerce'
						)}
						<Tooltip
							content={
								<>
									{__(
										'Replace default WooCommerce registration form in My Account page. Allow registration in My Account page via ',
										'registration-form-for-woocommerce'
									)}
									<ExternalLink href={WC_ACCOUNT_SETTINGS_URL}>
										{__('WooCommerce > Settings > Accounts & Privacy')}
									</ExternalLink>
								</>
							}
							width={325}
						>
							<Button icon={'info-outline'} />
						</Tooltip>
					</BaseControl.VisualLabel>
					<SelectControl
						value={formId}
						onChange={(v) => setFormId(parseInt(v))}
						options={[
							{ label: 'None', value: 0 },
							...(forms || []).map((form) => ({
								label:
									form?.post_title ||
									`(${__('no title', 'registration-form-for-woocommerce')})`,
								value: form?.ID,
							})),
						]}
						className="tgwcfb-setting"
					/>
				</BaseControl>
			</div>

			<div style={{ marginBottom: '28px' }}>
				<BaseControl className="tgwcfb-setting">
					<BaseControl.VisualLabel className="no-margin">
						<span style={{ opacity: 0.5, marginBottom: '6px' }}>
							{__('Checkout form', 'registration-form-for-woocommerce')}
						</span>
						<span
							className="tgwcfb-pro"
							style={{ marginLeft: '6px' }}
							onMouseEnter={() => setCheckoutProPopup(true)}
							onMouseLeave={() => setCheckoutProPopup(false)}
						>
							<span className="tgwcfb-pro__crown" aria-hidden="true">
								<CrownIcon />
							</span>
							<span
								className="tgwcfb-pro__popup"
								role="tooltip"
								style={{
									opacity: checkoutProPopup ? 1 : 0,
									visibility: checkoutProPopup ? 'visible' : 'hidden',
									pointerEvents: checkoutProPopup ? 'auto' : 'none',
									transform: checkoutProPopup
										? 'translateX(-50%) translateY(0)'
										: 'translateX(-50%) translateY(6px)',
								}}
								onMouseEnter={() => setCheckoutProPopup(true)}
								onMouseLeave={() => setCheckoutProPopup(false)}
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
					<SelectControl
						options={[{ label: 'None', value: 0 }]}
						className="tgwcfb-setting"
						disabled
						style={{
							opacity: 0.5,
							cursor: 'not-allowed',
							pointerEvents: 'none',
						}}
					/>
				</BaseControl>
			</div>
		</>
	);
};
