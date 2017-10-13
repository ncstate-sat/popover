import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationTriggerMetadata
} from '@angular/animations';

export const transformPopover: AnimationTriggerMetadata = trigger('transformPopover', [
  state('showing', style({
    opacity: 1,
    transform: 'scale(1)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'scale(0.3)'
    }),
    animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)')
  ]),
  transition('* => void', [
    animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      style({opacity: 0, transform: 'scale(0.5)'}))
  ])
]);
