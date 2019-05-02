import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'demo-focus',
  styleUrls: ['./focus.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Focus Behavior</mat-card-title>
      <mat-card-content>
        <div class="options">
          <mat-checkbox [(ngModel)]="autoFocus">Auto Focus</mat-checkbox>
          <mat-checkbox [(ngModel)]="restoreFocus">Restore Focus</mat-checkbox>
        </div>

        <div class="results mat-body-1" [satPopoverAnchorFor]="p">
          <button mat-icon-button class="edit" (click)="p.toggle()">
            <mat-icon>create</mat-icon>
          </button>
          <p><b>First Name</b>: {{ form.value.first }}</p>
          <p><b>Last Name</b>: {{ form.value.last }}</p>
          <p><b>Birth Date</b>: {{ form.value.birthDate | date }}</p>
        </div>

        <sat-popover #p hasBackdrop horizontalAlign="after" [autoFocus]="autoFocus" [restoreFocus]="restoreFocus">
          <div class="form" [formGroup]="form">
            <mat-form-field>
              <input matInput (keydown)="closeOnEnter($event)" formControlName="first" placeholder="First Name" />
            </mat-form-field>
            <mat-form-field>
              <input matInput (keydown)="closeOnEnter($event)" formControlName="last" placeholder="Last Name" />
            </mat-form-field>
            <mat-form-field>
              <input
                matInput
                (keydown)="closeOnEnter($event)"
                formControlName="birthDate"
                [matDatepicker]="picker"
                placeholder="Birth Date"
              />
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </div>
        </sat-popover>
      </mat-card-content>
    </mat-card>
  `
})
export class FocusDemo {
  @ViewChild(SatPopover) popover: SatPopover;
  autoFocus = true;
  restoreFocus = true;
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      first: 'Monty',
      last: 'Python',
      birthDate: new Date(1969, 9, 5)
    });
  }

  closeOnEnter(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.popover.close();
    }
  }
}
