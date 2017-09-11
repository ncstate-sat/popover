export function getNoAttachedOverlayError(): Error {
  return Error('SatOverlayAnchor must be provided an SatAttachedOverlayComponent');
}
