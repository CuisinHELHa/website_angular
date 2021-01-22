import {Component, Input} from '@angular/core';
import {ReviewDTO} from '@app/DTOs/review-dto';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent {
  @Input() reviews: ReviewDTO[];

  constructor() {
  }
}
