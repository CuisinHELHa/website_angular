import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/services/authentication.service';
import {AccountModalComponent} from '@app/components/account-modal/account-modal.component';

@Component({
  selector: 'app-authenticated-interface',
  templateUrl: './authenticated-interface.component.html',
  styleUrls: ['./authenticated-interface.component.css']
})
export class AuthenticatedInterfaceComponent implements OnInit {
  constructor(private authService: AuthenticationService) {
  }

  private _isLoggingOut: boolean;

  get isLoggingOut(): boolean {
    return this._isLoggingOut;
  }

  set isLoggingOut(value: boolean) {
    this._isLoggingOut = value;
  }

  ngOnInit() {
  }

  hideModal() {
    AccountModalComponent.hideModal();
  }
}
