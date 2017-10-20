import { VALID_POSX, VALID_POSY, VALID_SCROLL } from './popover.component';

export function getInvalidPopoverError(): Error {
  return Error('SatPopoverAnchor must be provided an SatPopover component instance.');
}

export function getUnanchoredPopoverError(): Error {
  return Error('SatPopover is not anchored to any SatPopoverAnchor.');
}

export function getInvalidXPositionError(pos): Error {
  return Error(generateGenericError('xPosition', pos, VALID_POSX));
}

export function getInvalidYPositionError(pos): Error {
  return Error(generateGenericError('yPosition', pos, VALID_POSY));
}

export function getInvalidScrollStrategyError(strategy): Error {
  return Error(generateGenericError('scrollStrategy', strategy, VALID_SCROLL));
}

function generateGenericError(apiName: string, invalid: any, valid: string[]): string {
  return `Invalid ${apiName}: '${invalid}'. Valid options are ` +
    `${valid.map(v => `'${v}'`).join(', ')}.`;
}
