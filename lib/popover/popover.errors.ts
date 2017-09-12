export function getInvalidPopoverError(): Error {
  return Error('SatPopoverAnchor must be provided an SatPopover component instance.');
}
