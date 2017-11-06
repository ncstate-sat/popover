import { VALID_HORIZ_ALIGN, VALID_VERT_ALIGN, VALID_SCROLL } from './popover.component';

export function getInvalidPopoverError(): Error {
  return Error('SatPopoverAnchor must be provided an SatPopover component instance.');
}

export function getUnanchoredPopoverError(): Error {
  return Error('SatPopover is not anchored to any SatPopoverAnchor.');
}

export function getInvalidHorizontalAlignError(alignment): Error {
  return Error(generateGenericError('horizontalAlign', alignment, VALID_HORIZ_ALIGN));
}

export function getInvalidVerticalAlignError(alignment): Error {
  return Error(generateGenericError('verticalAlign', alignment, VALID_VERT_ALIGN));
}

export function getInvalidScrollStrategyError(strategy): Error {
  return Error(generateGenericError('scrollStrategy', strategy, VALID_SCROLL));
}

function generateGenericError(apiName: string, invalid: any, valid: string[]): string {
  return `Invalid ${apiName}: '${invalid}'. Valid options are ` +
    `${valid.map(v => `'${v}'`).join(', ')}.`;
}
