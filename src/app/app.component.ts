import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalsService} from './services/globals.service';
import {RecipeDTO} from "./DTOs/recipe-dto";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'pCuisinHELHa';

  constructor(private globals: GlobalsService,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.globals.updateMobile();
  }

  logout():void {

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
