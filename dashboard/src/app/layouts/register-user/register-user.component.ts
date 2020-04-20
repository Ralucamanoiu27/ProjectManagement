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
  // static is_admin: boolean = true;
  // TODO: uncomment below and remove above
   static is_admin: boolean = false;

  loginEmail: string;
  loginPassword: string;
  validLogin: boolean;

  static isAdmin() {return RegisterUserComponent.is_admin;}

  ngOnInit(): void {
  }

  login() {
    this.userService.searchUserByName(this.loginEmail).subscribe(result => {
      this.validLogin = false;
      if (result.length === 1) {
        if (result[0].password === this.loginPassword) {
          this.validLogin = true;
          console.log(result[0].role);
          RegisterUserComponent.is_admin = result[0].role === 'ADMIN';  //result[0].role
          AuthGuardService.setValidLogin();
        }
      }
      if (this.validLogin) {
        this.router.navigate(['/home']);
      } else {

        // TODO: invalid username or pass
        console.log(result);
      }
    });
  }
}
