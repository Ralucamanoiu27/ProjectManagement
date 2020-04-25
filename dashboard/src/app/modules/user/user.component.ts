import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  displayName: string;
  role: string;
  roles: string[] = ['USER', 'ADMIN'];

  constructor(private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  saveUser() {
    const user = new User(null, this.username, this.password, this.email, this.displayName, this.role);

    this.userService.saveUser(user)
      .subscribe(result => console.log(result));

      this.toastr.success('Success!', 'The data has been saved!');

  }

}
