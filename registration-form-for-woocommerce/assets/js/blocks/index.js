import {
	registerBillingCompanyBlock,
	registerBillingCountryRegionBlock,
	registerBillingEmailBlock,
	registerBillingFirstnameBlock,
	registerBillingLastnameBlock,
	registerBillingPhoneBlock,
	registerBillingSeparateShippingBlock,
	registerBillingStateBlock,
	registerBillingStreetAddress1Block,
	registerBillingStreetAddress2Block,
	registerBillingTownCityBlock,
	registerBillingZipCodeBlock,
} from './billing';
import './block.scss';
import {
	registerCustomCheckboxBlock,
	registerCustomDatePickerBlock,
	registerCustomEmailBlock,
	registerCustomFileUploadBlock,
	registerCustomGdprAgreementBlock,
	registerCustomInputBlock,
	registerCustomMultiSelectBlock,
	registerCustomNumberBlock,
	registerCustomPhoneBlock,
	registerCustomProfilePictureBlock,
	registerCustomRadioBlock,
	registerCustomRangeBlock,
	registerCustomSelectBlock,
	registerCustomTextareaBlock,
	registerCustomTimePickerBlock,
	registerCustomUserRolesBlock,
} from './custom';
import {
	registerDefaultConfirmPasswordBlock,
	registerDefaultDisplayNameBlock,
	registerDefaultEmailBlock,
	registerDefaultFirstnameBlock,
	registerDefaultLastnameBlock,
	registerDefaultNicknameBlock,
	registerDefaultPasswordBlock,
	registerDefaultUserBioBlock,
	registerDefaultUsernameBlock,
	registerDefaultWebsiteBlock,
} from './default';
import {
	addFilters,
	addPreviewButton,
	addShortcodeToolbar,
	autoRecoverBlocks,
	hideEditorActions,
	removeProBlocks,
} from './helpers';
import registerPostMeta from './meta';
import {
	registerShippingCompanyBlock,
	registerShippingCountryRegionBlock,
	registerShippingFirstnameBlock,
	registerShippingLastnameBlock,
	registerShippingPhoneBlock,
	registerShippingStateBlock,
	registerShippingStreetAddress1Block,
	registerShippingStreetAddress2Block,
	registerShippingTownCityBlock,
	registerShippingZipCodeBlock,
} from './shipping';

// Add filters.
addFilters();
hideEditorActions();
addShortcodeToolbar();
addPreviewButton();
autoRecoverBlocks();

// Default fields.
registerDefaultUsernameBlock();
registerDefaultEmailBlock();
registerDefaultPasswordBlock();
registerDefaultConfirmPasswordBlock();
registerDefaultFirstnameBlock();
registerDefaultLastnameBlock();
registerDefaultDisplayNameBlock();
registerDefaultNicknameBlock();
registerDefaultWebsiteBlock();
registerDefaultUserBioBlock();

// Billing fields.
registerBillingFirstnameBlock();
registerBillingLastnameBlock();
registerBillingCompanyBlock();
registerBillingCountryRegionBlock();
registerBillingStreetAddress1Block();
registerBillingStreetAddress2Block();
registerBillingTownCityBlock();
registerBillingStateBlock();
registerBillingZipCodeBlock();
registerBillingPhoneBlock();
registerBillingEmailBlock();
registerBillingSeparateShippingBlock();

// Shipping fields.
registerShippingFirstnameBlock();
registerShippingLastnameBlock();
registerShippingCompanyBlock();
registerShippingCountryRegionBlock();
registerShippingStreetAddress1Block();
registerShippingStreetAddress2Block();
registerShippingTownCityBlock();
registerShippingStateBlock();
registerShippingZipCodeBlock();
registerShippingPhoneBlock();

// Custom fields.
registerCustomGdprAgreementBlock();
registerCustomEmailBlock();
registerCustomInputBlock();
registerCustomTextareaBlock();
registerCustomNumberBlock();
registerCustomCheckboxBlock();
registerCustomRadioBlock();
registerCustomSelectBlock();
registerCustomMultiSelectBlock();
registerCustomPhoneBlock();
registerCustomRangeBlock();
registerCustomDatePickerBlock();
registerCustomTimePickerBlock();
registerCustomUserRolesBlock();
registerCustomProfilePictureBlock();
registerCustomFileUploadBlock();

// Register post meta fields.
registerPostMeta();
removeProBlocks();
