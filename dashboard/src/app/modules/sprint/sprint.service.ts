import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sprint } from 'src/app/shared/model/sprint';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private readonly SPRINT_API = `${environment.serverApiUrl}/api/sprints`;

  constructor(private httpClient: HttpClient) { }

  saveSprint(sprint: Sprint): Observable<Sprint> {
    return this.httpClient.post<Sprint>(this.SPRINT_API, sprint);
  }

  getAllSprints(): Observable<Sprint[]> {
    return this.httpClient.get<Sprint[]>(this.SPRINT_API);
  }

  deleteSprint(id: number): Observable<Sprint> {
    return this.httpClient.delete<Sprint>(this.SPRINT_API + `/${id}`);
  }

  getSprintById(id: number): Observable<Sprint> {
    return this.httpClient.get<Sprint>(this.SPRINT_API + `/${id}`);

  }

  updateSprint(id: number, sprint: Sprint): Observable<Sprint> {
    return this.httpClient.put<Sprint>(this.SPRINT_API + `/${id}`, sprint);
  }

  searchByName(nameParam: string) {
    return this.httpClient.get<Sprint[]>(this.SPRINT_API + '/search', {
      params: {name: nameParam }
    });
  }

}
