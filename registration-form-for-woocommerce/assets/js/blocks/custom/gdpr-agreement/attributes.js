import { __ } from '@wordpress/i18n';

export default {
	clientId: {
		type: String,
	},
	label: {
		type: String,
		default: '',
	},
	fieldWidth: {
		type: Number,
		default: 100,
	},
	description: {
		type: String,
		default: '',
	},
	required: {
		type: Boolean,
		default: false,
	},
	hideLabel: {
		type: Boolean,
		default: false,
	},
	hasDescription: {
		type: Boolean,
		default: false,
	},
	agreementText: {
		type: String,
		default: 'I consent to the use of my submitted information to respond to my inquiry.',
	},
	checkedByDefault: {
		type: Boolean,
		default: false,
	},
	className: {
		type: String,
		default: '',
	},
};
