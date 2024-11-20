import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SatPopoverModule, SatPopoverComponent } from '../../../lib/public_api';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SatPopoverModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
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

        <div satPopoverAnchor #anchor="satPopoverAnchor" class="results mat-body-1">
          <button mat-icon-button class="edit" (click)="p.toggle()">
            <mat-icon>create</mat-icon>
          </button>
          <p><b>First Name</b>: {{ form.value.first }}</p>
          <p><b>Last Name</b>: {{ form.value.last }}</p>
          <p><b>Birth Date</b>: {{ form.value.birthDate | date }}</p>
        </div>

        <sat-popover
          #p
          [anchor]="anchor"
          hasBackdrop
          horizontalAlign="after"
          [autoFocus]="autoFocus"
          [restoreFocus]="restoreFocus"
        >
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
export class DemoFocusComponent {
  @ViewChild(SatPopoverComponent, { static: true }) popover: SatPopoverComponent;
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
