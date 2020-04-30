import { RegisterUserComponent } from 'src/app/layouts/register-user/register-user.component';
import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { AnimationDurations } from '@angular/material/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  isAdmin: boolean;
  username: string;
  email: string;

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role') === 'ADMIN';
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
  }
}
