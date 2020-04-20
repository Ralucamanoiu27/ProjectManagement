import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_API = `${environment.serverApiUrl}/api/users`;
  constructor(private httpClient: HttpClient) { }

  saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.USER_API, user);
  }

  searchUserByName(nameParam: string) {
    return this.httpClient.get<User[]>(this.USER_API + '/search', {
      params: { name: nameParam }
    });
  }
}
