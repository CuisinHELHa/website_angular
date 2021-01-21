import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Direction} from '@app/reactive-ui/enumerations/destination.enum';
import {ElementRefStylistService} from '@app/reactive-ui/services/element-ref-stylist.service';

@Directive({
  selector: '[appSlideOnHover]'
})
export class SlideOnHoverDirective implements OnInit {
  @Input() direction: Direction = Direction.LEFT;
  @Input() marginInPX = 18;
  @Input() durationInMS = 325;

  constructor(private el: ElementRef, private elementRefStylist: ElementRefStylistService) {
  }

  ngOnInit(): void {
    this.elementRefStylist.updateTransitionDuration(this.el, this.durationInMS);
    console.log('ngOnInit, trans duration: ', this.el.nativeElement.style.transitionDuration);
  }

  @HostListener('mouseenter')
  slideIn(direction = this.direction, marginInPX = this.marginInPX) {
    this.elementRefStylist.updateMarginWithDirection(this.el, direction, marginInPX);
  }

  @HostListener('mouseleave')
  slideOut(direction = this.direction) {
    this.elementRefStylist.updateMarginWithDirection(this.el, direction, 0);
  }
}
