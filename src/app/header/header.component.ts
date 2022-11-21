import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { UsersManagmentService } from '../users-managment/users-managment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private usersService: UsersManagmentService,
    public authService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout()
  }

  get role(): string{
    return this.usersService.getRole()!
  }

  get page(): string {
    return this.usersService.getPage()!
  }

  set page(page: string) {
    this.usersService.setPage(page)
  }
}