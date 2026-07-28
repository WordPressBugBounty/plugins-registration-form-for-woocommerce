import { __ } from '@wordpress/i18n';

const UPGRADE_URL =
	'https://themegrill.com/plugins/registration-form-for-woocommerce/';

const PRO_SELECTORS = [
	'.editor-block-list-item-tgwcfb-phone',
	'.editor-block-list-item-tgwcfb-multi-select',
	'.editor-block-list-item-tgwcfb-profile-picture',
	'.editor-block-list-item-tgwcfb-date-picker',
	'.editor-block-list-item-tgwcfb-user-roles',
	'.editor-block-list-item-tgwcfb-time-picker',
	'.editor-block-list-item-tgwcfb-range',
	'.editor-block-list-item-tgwcfb-file-upload',
	'.editor-block-list-item-tgwcfb-confirm-password',
];

const PRO_SELECTOR_STRING = PRO_SELECTORS.join(', ');

function injectSwalStyles() {
	if (document.getElementById('tgwcfb-swal-styles')) return;
	const style = document.createElement('style');
	style.id = 'tgwcfb-swal-styles';
	style.textContent = `
		.tgwcfb-swal-popup.swal2-popup {
			width: 420px;
			padding: 32px 28px 28px;
			border-radius: 12px;
		}
		.tgwcfb-swal-popup .swal2-html-container {
			margin: 0;
			padding: 0;
			overflow: visible;
		}
		.tgwcfb-swal {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
		.tgwcfb-swal__crown {
			width: 56px;
			height: 56px;
			border-radius: 14px;
			background-color: #ffe1cc;
			background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 24 24%22 fill%3D%22none%22 stroke%3D%22%23ff8c39%22 stroke-width%3D%222%22 stroke-linecap%3D%22round%22 stroke-linejoin%3D%22round%22%3E%3Cpath d%3D%22M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z%22%2F%3E%3Cpath d%3D%22M5 21h14%22%2F%3E%3C%2Fsvg%3E');
			background-repeat: no-repeat;
			background-position: center;
			background-size: 30px 30px;
			margin-bottom: 18px;
		}
		.tgwcfb-swal__title {
			margin: 0 0 10px;
			font-size: 20px;
			font-weight: 700;
			color: #1f2937;
			line-height: 1.3;
		}
		.tgwcfb-swal__text {
			margin: 0;
			font-size: 14px;
			line-height: 1.6;
			color: #4b5563;
			max-width: 320px;
		}
		.tgwcfb-swal-popup .swal2-actions {
			margin-top: 24px;
		}
		.tgwcfb-swal-cancel.swal2-styled.swal2-cancel {
			background: transparent !important;
			color: #4b5563 !important;
			border: 1px solid #d1d5db !important;
		}
		.tgwcfb-swal-cancel.swal2-styled.swal2-cancel:hover {
			background: #f9fafb !important;
			border-color: #9ca3af !important;
		}
	`;
	document.head.appendChild(style);
}

(function ($) {
	'use strict';

	$(function () {
		injectSwalStyles();

		$(document).on('click dragstart', PRO_SELECTOR_STRING, function (event) {
			event.preventDefault();
			event.stopImmediatePropagation();

			if (event.type !== 'click') return;

			if (document.activeElement) {
				document.activeElement.blur();
			}

			var blockClass = $(this).attr('class');
			var field = 'field';

			if (blockClass.includes('tgwcfb-phone')) {
				field = 'Phone';
			} else if (blockClass.includes('tgwcfb-multi-select')) {
				field = 'Multi-Select';
			} else if (blockClass.includes('tgwcfb-profile-picture')) {
				field = 'Profile Picture';
			} else if (blockClass.includes('tgwcfb-date-picker')) {
				field = 'Date Picker';
			} else if (blockClass.includes('tgwcfb-user-roles')) {
				field = 'User Roles';
			} else if (blockClass.includes('tgwcfb-time-picker')) {
				field = 'Time Picker';
			} else if (blockClass.includes('tgwcfb-range')) {
				field = 'Range';
			} else if (blockClass.includes('tgwcfb-file-upload')) {
				field = 'File Upload';
			} else if (blockClass.includes('tgwcfb-confirm-password')) {
				field = 'Confirm Password';
			}

			var title = __('Upgrade to Pro', 'registration-form-for-woocommerce');
			var message = __(
				'The %s field is available in Pro. Upgrade to unlock it.'.replace(
					'%s',
					field
				),
				'registration-form-for-woocommerce'
			);

			Swal.fire({
				html: `
					<div class="tgwcfb-swal">
						<span class="tgwcfb-swal__crown" aria-hidden="true"></span>
						<h2 class="tgwcfb-swal__title">${title}</h2>
						<p class="tgwcfb-swal__text">${message}</p>
					</div>
				`,
				showConfirmButton: true,
				showCancelButton: true,
				showCloseButton: true,
				reverseButtons: false,
				confirmButtonColor: '#ff8c39',
				confirmButtonText: __(
					'Upgrade to Pro',
					'registration-form-for-woocommerce'
				),
				cancelButtonText: __('Cancel', 'registration-form-for-woocommerce'),
				customClass: {
					popup: 'tgwcfb-swal-popup',
					cancelButton: 'tgwcfb-swal-cancel',
				},
			}).then((result) => {
				if (result.isConfirmed) {
					window.open(UPGRADE_URL, '_blank');
				}
			});
		});
	});
})(jQuery);

wp.domReady(function () {
	const disabledBlocks = [
		'tgwcfb/phone',
		'tgwcfb/multi-select',
		'tgwcfb/date-picker',
		'tgwcfb/profile-picture',
		'tgwcfb/range',
		'tgwcfb/time-picker',
		'tgwcfb/user-roles',
		'tgwcfb/file-upload',
		'tgwcfb/confirm-password',
	];

	setTimeout(function () {
		wp.data.subscribe(() => {
			const { getBlocks } = wp.data.select('core/block-editor');
			const blockList = getBlocks();

			blockList.forEach((block) => {
				if (block && block.name && disabledBlocks.includes(block.name)) {
					if (block.clientId) {
						wp.data.dispatch('core/block-editor').removeBlock(block.clientId);
					}
					if (Array.isArray(block.innerBlocks)) {
						block.innerBlocks.forEach((innerBlock) => {
							if (
								innerBlock &&
								innerBlock.clientId &&
								disabledBlocks.includes(innerBlock.name)
							) {
								wp.data
									.dispatch('core/block-editor')
									.removeBlock(innerBlock.clientId);
							}
						});
					}
				}
			});
		});
	}, 1000);
});
