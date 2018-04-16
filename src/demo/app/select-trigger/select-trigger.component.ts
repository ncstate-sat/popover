import { Component, ViewChild } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'demo-select-trigger',
  styleUrls: ['./select-trigger.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>MatSelect Trigger</mat-card-title>
      <mat-card-content>
        <mat-form-field [satPopoverAnchorFor]="p">
          <mat-select placeholder="Select 'Fancy'"
              (selectionChange)="updateSelectValue($event.value)">
            <mat-option value="boring">Boring</mat-option>
            <mat-option value="standard">Standard</mat-option>
            <mat-option value="fancy">Fancy</mat-option>
          </mat-select>
        </mat-form-field>
      </mat-card-content>
    </mat-card>

    <sat-popover #p hasBackdrop backdropClass="demo-background-rainbow">
      <div class="fancy-caption" [class.opened]="p.isOpen()">🎩</div>
    </sat-popover>
  `
})
export class SelectTriggerDemo {

  @ViewChild(SatPopover) popover: SatPopover;

  updateSelectValue(val: string) {
    if (val === 'fancy') {
      this.popover.open();
    }
  }
}
