import { Project } from './project';


export class Sprint {

  constructor(public id: number,
              public name: string,
              public project: Project,
              public dateFrom: Date,
              public dateTo: Date,
              public plannedStoryPoint: string) {
    }
}
