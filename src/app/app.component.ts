import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalsService} from './services/globals.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pCuisinHELHa';

  constructor(public globals:GlobalsService){}

  ngOnInit(): void {
    this.globals.updateMobile();
  }

  /**
   * On window resizing, updates the Globals service's "mobile" var.
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.globals.updateMobile();
  }
}
