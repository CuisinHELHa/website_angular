import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LOGO_PATH: string = "assets/img/cuisinHELHa_logo.png";
  public static _mobile:boolean;
  private _clickedLoginIcon:boolean;

  constructor() { }

  ngOnInit() {
    this.updateMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateMobile();
  }

  updateMobile():void {
      HeaderComponent._mobile = window.screen.width <= 420;
  }

  get clickedLoginIcon():boolean {
    return this._clickedLoginIcon;
  }

  set clickedLoginIcon(clickedLoginIcon:boolean) {
    this._clickedLoginIcon = clickedLoginIcon;
  }
}
