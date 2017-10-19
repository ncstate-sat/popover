export function getInvalidPopoverError(): Error {
  return Error('SatPopoverAnchor must be provided an SatPopover component instance.');
}

export function getUnanchoredPopoverError(): Error {
  return Error('SatPopover is not anchored to any SatPopoverAnchor.');
}

export function getInvalidXPositionError(pos): Error {
  return Error('Invalid xPosition: ' + pos +
      '. Valid options are \'before\', \'center\', \'after\'');
}

export function getInvalidYPositionError(pos): Error {
  return Error('Invalid yPosition: ' + pos +
      '. Valid options are \'above\', \'center\', \'below\'');
}
