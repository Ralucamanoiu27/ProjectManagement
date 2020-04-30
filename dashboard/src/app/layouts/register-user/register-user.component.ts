import { User } from './../../shared/model/user';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { UserService } from 'src/app/modules/user/user.service';
import { AuthGuardService } from './auth-guard.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }
  //static is_admin: boolean = true;
  // TODO: uncomment below and remove above
  static is_admin: boolean = false;

  loginUsername: string;
  loginPassword: string;
  validLogin: boolean;
  invalidLogin: boolean;

  ngOnInit(): void {
  }

  login() {
    this.userService.searchUserByName(this.loginUsername).subscribe(result => {
      this.validLogin = false;
      if (result.length === 1) {
        if (result[0].password === this.loginPassword) {
          this.validLogin = true;
          localStorage.setItem('username', result[0].username);
          localStorage.setItem('email', result[0].email);
          localStorage.setItem('role', result[0].role); //'ADMIN'
        }
      }
      if (this.validLogin) {
        this.router.navigate(['/home']);
      } else {
        this.invalidLogin = true;
        // TODO: invalid username or pass
        console.log(result);
      }
    });
  }
}
