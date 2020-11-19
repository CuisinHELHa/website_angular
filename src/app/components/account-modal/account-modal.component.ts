import {Component, HostListener, Injectable, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css']
})
export class AccountModalComponent {
  constructor(private _authService: AuthenticationService) {
  }

  get authService(): AuthenticationService {
    return this._authService;
  }

  static hideModal(): void {
    $('#accountModal').modal('hide');
  }
}
