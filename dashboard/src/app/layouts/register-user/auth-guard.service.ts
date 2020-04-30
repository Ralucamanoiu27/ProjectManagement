import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  private static is_auth = false;

  canActivate(): boolean {
    // TODO: remove below line
    //return true;
    if (localStorage.getItem('username')) {
      AuthGuardService.is_auth = true;
    }
    if (AuthGuardService.is_auth === false) {
      this.router.navigate(['/register']);
    }

    return AuthGuardService.is_auth;
  }
}
