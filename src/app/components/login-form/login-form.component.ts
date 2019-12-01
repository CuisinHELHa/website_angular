import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  private readonly COL_CLASSES_NOT_SIGNING_UP = "col-10 offset-1";
  private readonly COL_CLASSES_SIGNING_UP = "col-6";
  private _leftColClasses: String = this.COL_CLASSES_NOT_SIGNING_UP;
  private _isSigningUp: boolean;

  constructor() { }

  ngOnInit() {

  }

  get isSigningUp(): boolean {
    return this._isSigningUp;
  }

  set isSigningUp(value: boolean) {
    this._isSigningUp = value;
  }

  get leftColClasses(): String {
    return this._leftColClasses;
  }

  set leftColClasses(value: String) {
    this._leftColClasses = value;
  }
}
