import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/authorization.service';
import { UsersManagmentService } from 'src/app/users-managment/users-managment.service';
import { Post } from '../post.model'
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private postsSub!: Subscription
  
  constructor(
    private userService: UsersManagmentService,
    private postsService: PostsService,
    public authService: AuthorizationService,
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        console.log(postData.posts)
        this.posts = postData.posts;
      });

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDeleteClick(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe( () => {
      this.postsService.getPosts(this.postPerPage, this.currentPage);
    }, () => {
      this.isLoading = false
    })
  }

  onChangePage(pageDate: PageEvent){
    this.isLoading = true;
    this.currentPage = pageDate.pageIndex + 1;
    this.postPerPage = pageDate.pageSize;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
  }

  get role(): string{
    return this.userService.getRole()!
  }

  

}