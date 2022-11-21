import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Subscription } from 'rxjs';
import { UsersManagmentService } from 'src/app/users-managment/users-managment.service';
import { AuthorizationService } from '../authorization.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subValid = false;
  sub!: Subscription;

  constructor(
    private authService: AuthorizationService,
    private usersManagmentService: UsersManagmentService,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {

    this.usersManagmentService.setPage('Pokaż Zlecenia');
    this.form = new FormGroup({
      email: new FormControl ('', Validators.required),
      password: new FormControl ('', Validators.required)
    })
    this.sub = this.authService.getAuthStatusListener()
      .subscribe(result => {
        if(!result){
          this.subValid = true;
        }
      })
  }

  Submit(){
    this.authService.login(this.form.value.email, this.form.value.password)
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        switch (res.email){
          case "maksutka998@gmail.com": 
            this.authService.login('Maksym', 'test1')
            break;
          case "kohkodan.m@gmail.com":
            this.authService.login('test', 'test')
            break;
          default:
            this.subValid = true;
            this.socialAuthService.signOut()
        }

      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
