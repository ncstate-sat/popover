import { VALID_POSX, VALID_POSY } from './popover.component';

export function getInvalidPopoverError(): Error {
  return Error('SatPopoverAnchor must be provided an SatPopover component instance.');
}

export function getUnanchoredPopoverError(): Error {
  return Error('SatPopover is not anchored to any SatPopoverAnchor.');
}

export function getInvalidXPositionError(pos): Error {
  const errorString = `Invalid xPosition: '${pos}'. Valid options are ` +
    `${VALID_POSX.map(x => `'${x}'`).join(', ')}.`;
  return Error(errorString);
}

export function getInvalidYPositionError(pos): Error {
  const errorString = `Invalid yPosition: '${pos}'. Valid options are ` +
  `${VALID_POSY.map(x => `'${x}'`).join(', ')}.`;
  return Error(errorString);
}
