import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/** Enumerated actions for a popover to perform. */
export enum NotificationAction {
  OPEN,
  CLOSE,
  TOGGLE,
}

/** Event object for dispatching to anchor. */
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

}
