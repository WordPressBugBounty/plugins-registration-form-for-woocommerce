import { Button, Tooltip } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';
import { subscribe, useDispatch, useSelect } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { render, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

const TEXT_DOMAIN = 'registration-form-for-woocommerce';
const COPY_LABEL = __('Copy shortcode', TEXT_DOMAIN);
const COPIED_LABEL = __('Copied!', TEXT_DOMAIN);

const HeaderActions = () => {
	const formId = useSelect((select) => select('core/editor').getCurrentPostId());
	const { createNotice } = useDispatch('core/notices');
	const shortcode = `[tgwcfb_registration_form id="${formId || 0}"]`;

	const CopyButton = ({ text, onCopy, children }) => {
		const [copied, setCopied] = useState(false);
		const ref = useCopyToClipboard(text, () => {
			onCopy();
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});

		return (
			<Tooltip text={copied ? COPIED_LABEL : COPY_LABEL} placement="bottom">
				<span className="tgwcfb-header-copy-wrap">
					<Button
						variant="primary"
						ref={ref}
						className="tgwcfb-header-copy-shortcode"
						aria-label={copied ? COPIED_LABEL : COPY_LABEL}
					>
						{children}
					</Button>
				</span>
			</Tooltip>
		);
	};

	const onCopy = () => {
		createNotice(
			'success',
			sprintf(
				/* Translators: Form shortcode */
				__('Copied "%s" to clipboard', TEXT_DOMAIN),
				shortcode
			),
			{
				type: 'snackbar',
				isDismissible: true,
			}
		);
	};

	const CopyIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
			<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
		</svg>
	);

	return (
		<div className="tgwcfb-header-shortcode-wrap">
			<input
				type="text"
				className="tgwcfb-header-shortcode-input"
				readOnly
				value={shortcode}
				onFocus={(e) => e.currentTarget.select()}
			/>
			<CopyButton text={shortcode} onCopy={onCopy}>
				<CopyIcon />
			</CopyButton>
		</div>
	);
};

const addShortcodeToolbar = () => {
	let timeout = null;

	const unsubscribe = subscribe(() => {
		const headerSettings = window.document.querySelector(
			'.editor-header__settings, .edit-post-header__settings'
		);

		if (!headerSettings) {
			return;
		}

		if (headerSettings.querySelector('.tgwcfb-header-actions')) {
			return;
		}

		const existing = headerSettings.querySelector(
			'.tgwcfb-header-shortcode-wrap, .tgwcfb-shortcode-wrapper'
		);
		if (existing && !existing.closest('.tgwcfb-header-actions')) {
			existing.remove();
		}

		const wrapper = document.createElement('div');
		wrapper.classList.add('tgwcfb-header-actions');
		headerSettings.prepend(wrapper);
		render(<HeaderActions />, wrapper);

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			if (window.document.querySelector('.tgwcfb-header-actions')) {
				unsubscribe();
			}
		}, 0);
	});
};

export default () => {
	domReady(addShortcodeToolbar);
};
