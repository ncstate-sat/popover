import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SatPopover, SatPopoverAnchoringService } from '@ncstate/sat-popover';

@Component({
  selector: 'demo-event-delegation',
  styleUrls: ['./event-delegation.component.scss'],
  providers: [
    SatPopoverAnchoringService
  ],
  template: `
    <mat-card>
      <mat-card-title>Anchor via Event Delegation</mat-card-title>
      <mat-card-content>

        <div class="mat-elevation-z4">
          <mat-table #table [dataSource]="dataSource" (click)="delegateTableClick($event)">

            <!-- Position Column -->
            <ng-container matColumnDef="position">
              <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>
              <mat-cell *matCellDef="let element"> {{element.position}} </mat-cell>
            </ng-container>

            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
              <mat-cell *matCellDef="let element"> {{element.name}} </mat-cell>
            </ng-container>

            <!-- Symbol Column -->
            <ng-container matColumnDef="symbol">
              <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>
              <mat-cell *matCellDef="let element"> {{element.symbol}} </mat-cell>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <mat-header-cell *matHeaderCellDef></mat-header-cell>
              <mat-cell *matCellDef="let element">
                <button data-action="view" [attr.data-id]="element.position">
                  View
                </button>
                <button data-action="remove" [attr.data-id]="element.position">
                  Remove
                </button>
              </mat-cell>
            </ng-container>

            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
          </mat-table>
        </div>

      </mat-card-content>
    </mat-card>

    <sat-popover #view hasBackdrop backdropClass="demo-background-dark">
      <div class="view-popover">
        <ng-container *ngIf="getActiveElement(); let element">
          <b>{{ element.name }}</b><br>Weight: {{ element.weight }}
        </ng-container>
      </div>
    </sat-popover>

    <sat-popover #remove hasBackdrop backdropClass="demo-background-dark">
      <div class="remove-popover">
        Are you sure?<br>
        <button (click)="remove.close()">No</button>
        <button (click)="deleteRow(activeRow); remove.close()">Yes</button>
      </div>
    </sat-popover>
  `
})
export class EventDelegationDemo {

  @ViewChild('view') viewPopover: SatPopover;
  @ViewChild('remove') removePopover: SatPopover;

  displayedColumns = ['position', 'name', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  activeRow: number;

  constructor(
    private anchoringService: SatPopoverAnchoringService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  getActiveElement(): Element {
    return this.dataSource.data.find(row => row.position === this.activeRow);
  }

  delegateTableClick(event): void {
    if (event.target.matches('.mat-cell.mat-column-actions button')) {
      const action = event.target.getAttribute('data-action');
      const id = event.target.getAttribute('data-id');

      if (action === 'view') {
        this.view(+id, event.target);
      } else if (action === 'remove') {
        this.remove(+id, event.target);
      }
    }
  }

  view(id: number, element: any): void {
    this.activeRow = id;
    this.anchoringService.anchor(this.viewPopover, this.viewContainerRef, new ElementRef(element));
    this.anchoringService.openPopover();
  }

  remove(id: number, element: any): void {
    this.activeRow = id;
    this.anchoringService.anchor(
      this.removePopover,
      this.viewContainerRef,
      new ElementRef(element)
    );
    this.anchoringService.openPopover();
  }

  deleteRow(id): void {
    const rows = this.dataSource.data.slice();
    const index = rows.findIndex(row => row.position === id);
    if (index > -1) {
      rows.splice(index, 1);
    }
    this.dataSource.data = rows;
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
