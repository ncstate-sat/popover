import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ESCAPE } from '@angular/cdk/keycodes';
import { SatPopover } from '@ncstate/sat-popover';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';
import { filter } from 'rxjs/operators/filter';
import { takeUntil } from 'rxjs/operators/takeUntil';

@Component({
  selector: 'demo-disable-close',
  styleUrls: ['./disable-close.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Interactive Close Behavior</mat-card-title>
      <mat-card-content>
        <p>
          You must select one of the options in the popover. Pressing ESC or clicking outside
          the popover will not close it.
        </p>
        <button mat-raised-button
            color="accent"
            [satPopoverAnchorFor]="p"
            (click)="p.open()">
          Open
        </button>
      </mat-card-content>
    </mat-card>

    <sat-popover #p hasBackdrop interactiveClose="false" (closed)="showError = false">
      <div class="options" #optionsPanel>
        <p class="mat-body-1" [class.error]="showError">Please select one of the following:</p>
        <button mat-button (click)="p.close(true)">Agree</button>
        <button mat-button (click)="p.close(false)">Disagree</button>
      </div>
    </sat-popover>
  `
})
export class DisableCloseDemo implements AfterViewInit, OnDestroy {

  @ViewChild(SatPopover) popover: SatPopover;
  @ViewChild('optionsPanel') optionsPanel: ElementRef;

  showError = false;

  private _onDestroy = new Subject<void>();

  ngAfterViewInit() {
    const escape$ = this.popover.overlayKeydown.pipe(filter(e => e.keyCode === ESCAPE));
    const backdrop$ = this.popover.backdropClicked;

    merge(escape$, backdrop$)
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this._showAlert());
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private _showAlert() {
    this.showError = true;
    // make the options panel shake
    this.optionsPanel.nativeElement.classList.add('shake');
    setTimeout(() => this.optionsPanel.nativeElement.classList.remove('shake'), 300);
  }
}
