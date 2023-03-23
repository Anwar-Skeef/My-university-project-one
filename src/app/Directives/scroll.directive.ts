import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor(private el: ElementRef) {

    // el.nativeElement.scrollIntoView({ behavior: 'smooth' })
  }

}
