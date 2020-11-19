import {Component} from '@angular/core';
import {AuthenticationService} from '@app/services/authentication.service';
import {AccountModalComponent} from '@app/components/account-modal/account-modal.component';

@Component({
  selector: 'app-authenticated-interface',
  templateUrl: './authenticated-interface.component.html',
  styleUrls: ['./authenticated-interface.component.css']
})
export class AuthenticatedInterfaceComponent {
  constructor(private _authService: AuthenticationService) {
  }

  private _isLoggingOut: boolean;

  get isLoggingOut(): boolean {
    return this._isLoggingOut;
  }

  set isLoggingOut(value: boolean) {
    this._isLoggingOut = value;
  }

  get authService(): AuthenticationService {
    return this._authService;
  }

  hideModal() {
    AccountModalComponent.hideModal();
  }
}
