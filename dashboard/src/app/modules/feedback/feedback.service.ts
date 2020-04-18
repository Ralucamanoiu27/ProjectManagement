import { Injectable } from '@angular/core';
import { Email } from 'src/app/shared/model/email';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  private readonly EMAIL_API = `${environment.serverApiUrl}/email/`;
  constructor(private httpClient: HttpClient) { }

  sendEmail(email: Email): Observable<Email> {
    console.log(email);
    return this.httpClient.post<Email>(this.EMAIL_API, email);
  }
}
