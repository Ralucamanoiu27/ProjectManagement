import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  otherTheme: boolean = false;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
      new Event('resize')
      );
    }, 300);
  }

  changeTheme() {
    this.otherTheme = !this.otherTheme;
  }

}
