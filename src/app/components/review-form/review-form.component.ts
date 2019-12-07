import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReviewDTO} from "@app/DTOs/review-dto";
import {AuthenticationService} from "@app/services/authentication.service";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  @Output()
  private reviewPosted:EventEmitter<ReviewDTO> = new EventEmitter<ReviewDTO>()

  private _form: FormGroup = this.fb.group({
    rate: this.fb.control("", Validators.required),
    review: this.fb.control("")
  });

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService) {

}

  ngOnInit() {

  }

  postReview() {
    this.reviewPosted.next({
      idRecipe:-1,
      idUser:7,
      rate:this._form.get("rate").value,
      reviewMessage:this._form.get("review").value
    })

    this._form.reset();
  }
}
