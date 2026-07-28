import $ from 'jquery';

(() => {
	$('.tgwcfb-enhanced-select').each(function () {
		const $select = $(this);
		const name = $select.attr('name') || '';
		const id = $select.attr('id') || '';

		// Single-select fields use the native <select> so open/close works reliably.
		// Select2 is only used for multi-select and user roles.
		if (
			!$select.prop('multiple') &&
			name !== 'user_roles' &&
			id !== 'user_roles'
		) {
			$select.removeClass('tgwcfb-enhanced-select');
			return;
		}

		if ($select.hasClass('select2-hidden-accessible') || $select.data('select2')) {
			return;
		}

		$select.selectWoo({
			minimumResultsForSearch: -1,
			width: '100%',
			dropdownParent: $(document.body),
		});
	});
})();
