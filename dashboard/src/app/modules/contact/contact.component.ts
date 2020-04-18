import { Email } from './../../shared/model/email';
import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  emailTo: string;
  username: string;
  emailFrom: string;
  subject: string;
  message: string;


  constructor(private contactService: ContactService) { }
  //  e: Email;
  ngOnInit(): void {
    console.log("hhgffff");

    // this.e = new Email("","","","");
    // this.emailFrom = "raluca.manoiu27@gmail.com";
    // this.e.username =	"Alex";
    // this.e.subject =  "test";
    // this.e.message = "Test . I just want to sent you some cokies";



  }
  sendEmail() {
  const emailTo = 'raluca.manoiu27@gmail.com';
  const e = new Email(this.username, emailTo, this.emailFrom , this.subject, this.message);
  this.contactService.sendEmail(e)
      .subscribe(result => console.log("send email"));
  }
}
