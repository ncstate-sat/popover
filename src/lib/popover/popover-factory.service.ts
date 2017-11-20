import {
  ComponentFactoryResolver,
  ElementRef,
  Injectable,
  TemplateRef
} from '@angular/core';
import { ComponentType, ComponentPortal } from '@angular/cdk/portal';

import { SatPopover } from './popover.component';

export class SatPopoverRef<T> {

  constructor(
    /** Instance of the component opened within the popover. */
    public componentInstance: T,
    /** Instance of the containing popover. */
    public popoverInstance: SatPopover,
  ) { }

  open(): this {

    return this;
  }

  close(val?: any): this {

    return this;
  }

  toggle(): this {

    return this;
  }

  isOpen(): boolean {

    return false;
  }

}


@Injectable()
export class SatPopoverFactory {

  constructor(private resolver: ComponentFactoryResolver) { }

  build<T>(
    view: ComponentType<T> | TemplateRef<T>,
    anchor: ElementRef,
    options: any,
  ): SatPopoverRef<any> {
    // TODO: Create a popover
    const popoverPortal = new ComponentPortal(SatPopover);

    // TODO: Place the view within it
    if (view instanceof TemplateRef) {

    } else {
      console.log(popoverPortal);
    }

    // TODO: Anchor the popover

    // Create a new popover reference and return it
    return new SatPopoverRef(view, null);
  }

}
