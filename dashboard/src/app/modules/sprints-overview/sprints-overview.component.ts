import { Component, OnInit } from '@angular/core';
import { SprintService } from '../sprint/sprint.service';
import { Observable } from 'rxjs';
import { Sprint } from 'src/app/shared/model/sprint';

@Component({
  selector: 'app-sprints-overview',
  templateUrl: './sprints-overview.component.html',
  styleUrls: ['./sprints-overview.component.scss']
})
export class SprintsOverviewComponent implements OnInit {

  sprints: Observable<Sprint[]>;
  columnsToDisplay: string[];


  constructor(private sprintService: SprintService) {}

  ngOnInit() {

    this.sprints = this.sprintService.getAllSprints();
    this.columnsToDisplay = ['id', 'name', 'project', 'dateFrom', 'dateTo', 'plannedStoryPoint', 'actions', 'update'];
  }

  displayFnTwo(sprint?: Sprint): string | undefined {
    return sprint ? sprint.name : undefined;
  }

  deleteSprint(id: number) {
      this.sprintService.deleteSprint(id)
        .subscribe(result => this.sprints = this.sprintService.getAllSprints());
  }


}