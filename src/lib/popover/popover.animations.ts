import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';

export const transformPopover: AnimationTriggerMetadata = trigger('transformPopover', [
  state('enter', style({ opacity: 1, transform: 'scale(1)' }), { params: { startAtScale: 0.3 } }),
  state('void, exit', style({ opacity: 0, transform: 'scale({{endAtScale}})' }), { params: { endAtScale: 0.5 } }),
  transition('* => enter', [
    style({ opacity: 0, transform: 'scale({{endAtScale}})' }),
    animate('{{openTransition}}', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition('* => void, * => exit', [
    animate('{{closeTransition}}', style({ opacity: 0, transform: 'scale({{endAtScale}})' }))
  ])
]);
