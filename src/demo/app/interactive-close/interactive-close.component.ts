import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ESCAPE } from '@angular/cdk/keycodes';
import { SatPopover } from '@ncstate/sat-popover';
import { Subject, merge } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'demo-interactive-close',
  styleUrls: ['./interactive-close.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Interactive Close Behavior</mat-card-title>
      <mat-card-content>
        <mat-checkbox [(ngModel)]="interactiveClose">Allow Interactive Closing</mat-checkbox>
        <p *ngIf="!interactiveClose">
          You must select one of the options in the popover. Pressing ESC or clicking outside the popover will not close
          it.
        </p>
        <p *ngIf="interactiveClose">
          You don't necessarily need to select an option. You can press ESC or click on the backdrop to close the
          popover.
        </p>
        <button mat-raised-button satPopoverAnchor #anchor="satPopoverAnchor" color="accent" (click)="p.open()">
          Open
        </button>
      </mat-card-content>
    </mat-card>

    <sat-popover
      #p
      [anchor]="anchor"
      hasBackdrop
      backdropClass="demo-background-dark"
      [interactiveClose]="interactiveClose"
      (closed)="showError = false"
    >
      <div class="options" #optionsPanel>
        <p class="mat-body-1" [class.error]="showError">Please select one of the following:</p>
        <button mat-button (click)="p.close(true)">Agree</button>
        <button mat-button (click)="p.close(false)">Disagree</button>
      </div>
    </sat-popover>
  `
})
export class InteractiveCloseDemo implements AfterViewInit, OnDestroy {
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
  @ViewChild('optionsPanel') optionsPanel: ElementRef;

  showError = false;
  interactiveClose = false;

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
