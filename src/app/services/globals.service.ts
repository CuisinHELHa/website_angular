import {HostListener, Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Represents global variables such as if the user's on a smartphone.
 */
@Injectable()
export class GlobalsService{
  private _mobile:boolean;
  public static readonly MOBILE_MAX_WIDTH:number = 420;

  constructor() {}

  /// MOBILE
  updateMobile():void {
    this._mobile = window.screen.width <= GlobalsService.MOBILE_MAX_WIDTH;
  }

  get mobile(): boolean {
    return this._mobile;
  }

  set mobile(value: boolean) {
    this._mobile = value;
  }

}
