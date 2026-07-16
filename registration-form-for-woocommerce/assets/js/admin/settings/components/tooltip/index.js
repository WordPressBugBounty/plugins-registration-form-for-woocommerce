import { Popover } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';

export default ({
	children,
	content,
	disabled = false,
	position = 'bottom center',
	width = 200,
}) => {
	const [isTriggerHovered, setIsTriggerHovered] = useState(false);
	const [isTooltipHovered, setIsTooltipHovered] = useState(false);
	const ref = useRef();

	if (disabled) return <>{children}</>;

	const isOpen = isTriggerHovered || isTooltipHovered;

	return (
		<div
			ref={ref}
			onMouseEnter={() => setIsTriggerHovered(true)}
			onMouseLeave={() => setIsTriggerHovered(false)}
		>
			{children}
			{isOpen && (
				<Popover
					focusOnMount={false}
					className="tgwcfb-tooltip"
					position={position}
					onClose={() => {
						setIsTriggerHovered(false);
						setIsTooltipHovered(false);
					}}
					onFocusOutside={() => {
						setIsTriggerHovered(false);
						setIsTooltipHovered(false);
					}}
					noArrow={false}
					onMouseEnter={() => setIsTooltipHovered(true)}
					onMouseLeave={() => setIsTooltipHovered(false)}
				>
					<div style={{ minWidth: width }} className="tgwcfb-tooltip-content">
						{content}
					</div>
				</Popover>
			)}
		</div>
	);
};
