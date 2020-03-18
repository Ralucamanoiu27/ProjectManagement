import { User } from './user';
import { Sprint } from './sprint';

export class Task {

  constructor(public id: number,
              public nameTask: string,
              public descriptionTask: string,
              public sprint: Sprint,
              public difficulty: string,
              public storyPoints: string,
              public progress: string,
              public assignedPerson: User) {

  }
}
