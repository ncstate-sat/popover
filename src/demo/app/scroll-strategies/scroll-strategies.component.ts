import { Component } from '@angular/core';

@Component({
  selector: 'demo-scroll-strategies',
  styleUrls: ['./scroll-strategies.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Scroll Strategies</mat-card-title>
      <mat-card-content>
        <mat-form-field>
          <mat-select [(ngModel)]="strategy">
            <mat-option *ngFor="let option of scrollOptions" [value]="option.value">
              {{ option.name }} (<code>{{ option.value }}</code>)
            </mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-raised-button
            class="anchor"
            color="primary"
            [satPopoverAnchorFor]="p"
            (click)="p.toggle()">
          TOGGLE
        </button>

        <sat-popover #p xPosition="after" hasBackdrop [scrollStrategy]="strategy">
          <div class="popover mat-body-1">Scroll the page to observe behavior.</div>
        </sat-popover>

      </mat-card-content>
    </mat-card>
  `
})
export class ScrollStrategiesDemo {

  strategy = 'reposition';

  scrollOptions = [
    // TODO: support close on resolution of https://github.com/angular/material2/issues/7922
    { value: 'noop', name: 'Do nothing' },
    { value: 'block', name: 'Block scrolling' },
    { value: 'reposition', name: 'Reposition on scroll' },
    { value: 'rugrats', name: 'Invalid option' },
  ];
}
