export type SatPopoverScrollStrategy = 'noop' | 'block' | 'reposition' | 'close';
export const VALID_SCROLL: SatPopoverScrollStrategy[] = ['noop', 'block', 'reposition', 'close'];

export type SatPopoverHorizontalAlign = 'before' | 'start' | 'center' | 'end' | 'after';
export const VALID_HORIZ_ALIGN: SatPopoverHorizontalAlign[] = ['before', 'start', 'center', 'end', 'after'];

export type SatPopoverVerticalAlign = 'above' | 'start' | 'center' | 'end' | 'below';
export const VALID_VERT_ALIGN: SatPopoverVerticalAlign[] = ['above', 'start', 'center', 'end', 'below'];

export interface SatPopoverOpenOptions {
  /**
   * Whether the popover should return focus to the previously focused element after
   * closing. Defaults to true.
   */
  restoreFocus?: boolean;

  /** Whether the first focusable element should be focused on open. Defaults to true. */
  autoFocus?: boolean;
}
