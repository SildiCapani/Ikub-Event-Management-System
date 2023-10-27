import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { calculateDaysLeft } from 'src/app/core/const/calculate-days';
import { Event } from 'src/app/core/models/event';
import { User } from 'src/app/core/models/user';
import { CommentsService } from 'src/app/core/services/comments.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent {

  @Input() event: Event;
  eventId = this.activatedRoute.snapshot.paramMap.get('id');
  user: User = this.userService.user$.getValue()
  commentForm = new FormGroup({
    comment: new FormControl ('', [Validators.required, Validators.minLength(10)])
  })

  constructor (private activatedRoute: ActivatedRoute, private commentService: CommentsService, private userService: UserService) {
  
  }

  addComment(): void {
    const comment = {
      userName: this.user.fullName,
      comment: this.commentForm.get('comment').value
    }

    this.commentService.comment(comment, this.eventId)

  }

  calculateDaysLeftFunction = calculateDaysLeft

}
