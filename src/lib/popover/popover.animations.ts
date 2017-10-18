import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationTriggerMetadata
} from '@angular/animations';

export const transformPopover: AnimationTriggerMetadata = trigger('transformPopover', [
  transition(':enter', [
    style({opacity: 0, transform: 'scale(0.3)'}),
    animate('{{openTransition}}',
      style({opacity: 1, transform: 'scale(1)'}))
  ]),
  transition(':leave', [
    animate('{{closeTransition}}',
      style({opacity: 0, transform: 'scale(0.5)'}))
  ])
]);
