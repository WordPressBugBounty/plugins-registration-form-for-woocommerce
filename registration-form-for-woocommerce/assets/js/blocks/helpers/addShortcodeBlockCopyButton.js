import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useRef, useCallback } from '@wordpress/element';

const CopyIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
		<path d="M5.5 3.5h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M5.5 3.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

const addShortcodeBlockCopyButton = ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, clientId } = props;
		const blockRef = useRef( null );
		
		// Only apply to shortcode block
		if ( name !== 'core/shortcode' ) {
			return <BlockEdit { ...props } />;
		}

		const { text } = attributes;
		const { createNotice } = useDispatch( 'core/notices' );
		
		// Check if this is our shortcode
		const isTgwcfbShortcode = text && text.includes( '[tgwcfb_registration_form' );
		
		if ( ! isTgwcfbShortcode ) {
			return <BlockEdit { ...props } />;
		}

		const handleCopy = useCallback( async () => {
			try {
				// Try modern Clipboard API first
				if ( navigator.clipboard && navigator.clipboard.writeText ) {
					await navigator.clipboard.writeText( text );
				} else {
					// Fallback for older browsers
					const textArea = document.createElement( 'textarea' );
					textArea.value = text;
					textArea.style.position = 'fixed';
					textArea.style.opacity = '0';
					document.body.appendChild( textArea );
					textArea.select();
					document.execCommand( 'copy' );
					document.body.removeChild( textArea );
				}
				
				createNotice(
					'success',
					sprintf(
						/* Translators: Shortcode text */
						__( 'Copied "%s" to clipboard', 'custom-registration-from-fields-builder-for-woocommerce' ),
						text
					),
					{
						type: 'snackbar',
						isDismissible: true,
					}
				);
			} catch ( error ) {
				// Silently fail if copy doesn't work
				console.error( 'Failed to copy shortcode:', error );
			}
		}, [ text, createNotice ] );

		// Add copy button to the block's edit view
		useEffect( () => {
			if ( ! blockRef.current ) {
				return;
			}

			// Use a small delay to ensure the block is fully rendered
			const timeoutId = setTimeout( () => {
				// Find the shortcode block element
				const blockElement = blockRef.current.closest( '.wp-block-shortcode' ) || 
					blockRef.current.querySelector( '.wp-block-shortcode' ) ||
					blockRef.current;
				
				if ( ! blockElement ) {
					return;
				}

				// Check if button already exists
				if ( blockElement.querySelector( '.tgwcfb-shortcode-copy-btn' ) ) {
					return;
				}

				// Find the shortcode text input or the block content wrapper
				const shortcodeInput = blockElement.querySelector( 'input[type="text"], textarea, .components-text-control__input' );
				const blockContent = blockElement.querySelector( '.wp-block-shortcode__textarea, .block-editor-plain-text' ) || shortcodeInput;
				
				if ( ! blockContent ) {
					return;
				}

				// Create copy button
				const copyButton = document.createElement( 'button' );
				copyButton.className = 'tgwcfb-shortcode-copy-btn components-button is-primary';
				copyButton.type = 'button';
				copyButton.setAttribute( 'aria-label', __( 'Copy shortcode', 'custom-registration-from-fields-builder-for-woocommerce' ) );
				copyButton.setAttribute( 'title', __( 'Copy shortcode', 'custom-registration-from-fields-builder-for-woocommerce' ) );
				copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style="width: 16px; height: 16px;"><path d="M5.5 3.5h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 3.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
				
				copyButton.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					e.stopPropagation();
					handleCopy();
				} );

				// Try to insert button next to the input, or append to the block content wrapper
				const inputWrapper = blockContent.parentNode;
				if ( inputWrapper && ( inputWrapper.classList.contains( 'components-base-control' ) || inputWrapper.classList.contains( 'wp-block-shortcode__textarea-wrapper' ) ) ) {
					// Insert after the input wrapper
					inputWrapper.style.display = 'inline-flex';
					inputWrapper.style.alignItems = 'center';
					inputWrapper.style.gap = '4px';
					inputWrapper.appendChild( copyButton );
				} else if ( blockContent.parentNode ) {
					// Insert after the input
					blockContent.parentNode.insertBefore( copyButton, blockContent.nextSibling );
				} else {
					// Fallback: append to block element
					blockElement.appendChild( copyButton );
				}
			}, 100 );

			// Cleanup
			return () => {
				clearTimeout( timeoutId );
			};
		}, [ text, clientId, handleCopy ] );

		return (
			<>
				<BlockControls>
					<ToolbarButton
						icon={ CopyIcon }
						label={ __( 'Copy shortcode', 'custom-registration-from-fields-builder-for-woocommerce' ) }
						onClick={ handleCopy }
					/>
				</BlockControls>
				<div ref={ blockRef }>
					<BlockEdit { ...props } />
				</div>
			</>
		);
	};
};

export default () => {
	addFilter(
		'editor.BlockEdit',
		'tgwcfb/add-shortcode-copy-button',
		addShortcodeBlockCopyButton
	);
};

