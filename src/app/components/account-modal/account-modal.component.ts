import {Component, Injectable, OnInit} from '@angular/core';
import {AuthenticationService} from "@app/services/authentication.service";

declare var $: any;

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css']
})
export class AccountModalComponent implements OnInit {

  constructor(private _authService:AuthenticationService) {
  }

  ngOnInit() {
    // AccountModalComponent.showModal();
  }

  static showModal(): void {
    $("#accountModal").modal('show');
  }

  static hideModal(): void {
    $("#accountModal").modal('hide');
  }

  get authService(): AuthenticationService {
    return this._authService;
  }
}
