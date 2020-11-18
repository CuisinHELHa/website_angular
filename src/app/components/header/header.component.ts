import {Component, HostListener} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  readonly LOGO_PATH: string = 'assets/img/cuisinHELHa_logo.png';

  onLoginIconClick() {
    $('#accountModal').modal('show');
  }
}
