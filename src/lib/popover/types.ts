export type SatPopoverScrollStrategy = 'noop' | 'block' | 'reposition' | 'close';
export const VALID_SCROLL: SatPopoverScrollStrategy[] = [
  'noop',
  'block',
  'reposition',
  'close'
];

export type SatPopoverHorizontalAlign = 'before' | 'start' | 'center' | 'end' | 'after';
export const VALID_HORIZ_ALIGN: SatPopoverHorizontalAlign[] = [
  'before',
  'start',
  'center',
  'end',
  'after'
];

export type SatPopoverVerticalAlign = 'above'  | 'start' | 'center' | 'end' | 'below';
export const VALID_VERT_ALIGN: SatPopoverVerticalAlign[] = [
  'above',
  'start',
  'center',
  'end',
  'below'
];
