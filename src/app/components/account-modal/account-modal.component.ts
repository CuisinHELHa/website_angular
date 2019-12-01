import { Component, OnInit } from '@angular/core';
declare var $ : any;

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css']
})
export class AccountModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  showModal():void {
    $("#accountModal").modal('show');
  }

  hideModal():void{
    $("#accountModal").modal('hide');
  }
}
