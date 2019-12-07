import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Represents global variables such as if the user's on a smartphone.
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public static readonly MOBILE_MAX_WIDTH: number = 420;

  constructor() {
  }

  private _mobile: boolean;

  get mobile(): boolean {
    return this._mobile;
  }

  set mobile(value: boolean) {
    this._mobile = value;
  }

  /// MOBILE
  updateMobile(): void {
    this._mobile = window.screen.width <= GlobalsService.MOBILE_MAX_WIDTH;
  }

}
