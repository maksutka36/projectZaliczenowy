import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authorization/auth.guard';
import { LoginComponent } from './authorization/login/login.component';
import { PostFixedListComponent } from './post-fixed-list/post-fixed-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'createPost', component: PostCreateComponent},
  {path: '', component: PostListComponent, canActivate: [AuthGuard]},
  {path: 'fixed', component: PostFixedListComponent, canActivate: [AuthGuard]},
  {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
