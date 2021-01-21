import {ElementRef, Injectable} from '@angular/core';
import {Direction} from '@app/reactive-ui/enumerations/destination.enum';

@Injectable({
  providedIn: 'root'
})
export class ElementRefStylistService {

  updateTransitionDuration(el: ElementRef, durationInMS: number) {
    const elStyle = el.nativeElement.style;

    if (durationInMS >= 0) {
      const transitionDuration = durationInMS + 'ms';
      elStyle.transitionDuration = transitionDuration;
    }
  }

  updateMarginWithDirection(el: ElementRef, destination: Direction, marginInPX: number) {
    const elStyle = el.nativeElement.style;
    const margin = marginInPX + 'px';

    switch (destination) {
      case Direction.BOTTOM:
        elStyle.marginBottom = margin;
        console.log(elStyle.marginBottom);
        break;

      case Direction.LEFT:
        elStyle.marginLeft = margin;
        console.log(elStyle.marginLeft);
        break;

      case Direction.RIGHT:
        elStyle.marginRight = margin;
        console.log(elStyle.marginRight);
        break;

      case Direction.TOP:
        elStyle.marginLeft = margin;
        console.log(elStyle.marginTop);
        break;
    }
  }
}
