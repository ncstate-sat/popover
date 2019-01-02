import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/** Enumerated actions for a popover to perform. */
export enum NotificationAction {
  /** Popover should open. */
  OPEN,
  /** Popover should close. */
  CLOSE,
  /** Popover should toggle open or closed. */
  TOGGLE,
  /** Popover has new target positions. */
  REPOSITION,
  /** Popover needs new configuration. */
  UPDATE_CONFIG,
  /** Popover should realign itself to the anchor.  */
  REALIGN,
}

/** Event object for dispatching to anchoring service. */
export class PopoverNotification {
  constructor(
    /** Action to perform. */
    public action: NotificationAction,
    /** Optional payload. */
    public value?: any
  ) { }
}

@Injectable()
export class PopoverNotificationService {

  private store = new Subject<PopoverNotification>();

  /** Dispatch a notification to all subscribers. */
  dispatch(notification: PopoverNotification) {
    this.store.next(notification);
  }

  /** Stream of notification events. */
  events(): Observable<PopoverNotification> {
    return this.store.asObservable();
  }

  /** Complete event stream. */
  dispose(): void {
    this.store.complete();
  }

}
