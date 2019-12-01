import {Component, OnInit} from '@angular/core';
import {GlobalsService} from '../../services/globals.service';

declare var $: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  readonly LOGO_PATH: string = 'assets/img/cuisinHELHa_logo.png';

  constructor(public globals: GlobalsService) {
  }

  /// MOBILE
  get mobile(): boolean {
    return this.globals.mobile;
  }

  ngOnInit() {
  }

  /// CLICKED LOGIN ICON
  onLoginIconClick() {
    $('#accountModal').modal('show');
  }
}
