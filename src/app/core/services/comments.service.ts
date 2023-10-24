import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comment } from '../models/event';

@Injectable({
  providedIn: 'root'
})


export class CommentsService {

  constructor(private db: AngularFireDatabase, private toastrService: ToastrService, private router: Router) { }

  comment(comment: Comment, eventId: string): void {
     const event = this.db.list(`events/${eventId}/data/comments`).push(comment)

    .then( () => {
      this.toastrService.success('Thank you for you feedback');
      this.router.navigateByUrl('')
  })
  }
}
