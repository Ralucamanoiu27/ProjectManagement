import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/shared/model/email';

import { FeedbackService } from './feedback.service';
import { Task } from 'src/app/shared/model/task';
import { TaskService } from '../task/task.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {


  emailTo: string;
  username: string;
  emailFrom: string;
  subject: string;
  message: string;




  constructor(private feedbackService: FeedbackService,
              private taskService: TaskService) { }

  ngOnInit(): void {
    console.log("hhgffff");

    

  }
  sendEmail() {

  const e = new Email(this.username, this.emailTo, this.emailFrom , this.subject, this.message);
  this.feedbackService.sendEmail(e)
      .subscribe(result => console.log("send email"));
  }

}
