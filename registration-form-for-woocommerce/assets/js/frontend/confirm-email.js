/**
 * Confirm Email Validation
 *
 * Validates that confirm email matches email field.
 */
(function ($) {
	'use strict';

	$(document).ready(function () {
		function validateEmailMatch() {
			const emailField = $('#reg_email');
			const confirmEmailField = $('#reg_confirm_email');

			if (!emailField.length || !confirmEmailField.length) {
				return true;
			}

			const email = emailField.val();
			const confirmEmail = confirmEmailField.val();

			confirmEmailField.removeClass('error');
			confirmEmailField.closest('.form-row').find('.email-mismatch-error').remove();

			if (!confirmEmail && email) {
				confirmEmailField.addClass('error');
				const errorMessage = $(
					'<span class="email-mismatch-error" style="color: #e2401c; display: block; margin-top: 5px;">Please confirm your email address.</span>'
				);
				confirmEmailField.closest('.form-row').append(errorMessage);
				return false;
			}

			if (confirmEmail && email !== confirmEmail) {
				confirmEmailField.addClass('error');
				const errorMessage = $(
					'<span class="email-mismatch-error" style="color: #e2401c; display: block; margin-top: 5px;">Email addresses do not match.</span>'
				);
				confirmEmailField.closest('.form-row').append(errorMessage);
				return false;
			}

			return true;
		}

		$(document).on('blur', '#reg_confirm_email', function () {
			validateEmailMatch();
		});

		$(document).on('blur', '#reg_email', function () {
			if ($('#reg_confirm_email').val()) {
				validateEmailMatch();
			}
		});

		$(document).on('submit', 'form.register, form.woocommerce-form-register, form.woocommerce-form.woocommerce-form-register', function (e) {
			if (!validateEmailMatch()) {
				e.preventDefault();
				$('#reg_confirm_email').focus();
				return false;
			}
		});

		$(document).on('input', '#reg_confirm_email', function () {
			if ($(this).val()) {
				validateEmailMatch();
			}
		});
	});
})(jQuery);
