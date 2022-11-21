import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { UsersManagmentService } from '../users-managment/users-managment.service';

@Component({
  selector: 'app-post-fixed-list',
  templateUrl: './post-fixed-list.component.html',
  styleUrls: ['./post-fixed-list.component.scss']
})
export class PostFixedListComponent implements OnInit {

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private postsSub!: Subscription
  
  constructor(
    private usersService: UsersManagmentService,
    private postsService: PostsService,
    public authService: AuthorizationService,
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPostsFixed(this.postPerPage, this.currentPage);
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
      this.postsService.getPostsFixed(this.postPerPage, this.currentPage);
    }, () => {
      this.isLoading = false
    })
  }

  onChangePage(pageDate: PageEvent){
    this.isLoading = true;
    this.currentPage = pageDate.pageIndex + 1;
    this.postPerPage = pageDate.pageSize;
    this.postsService.getPostsFixed(this.postPerPage, this.currentPage);
  }

  
  get role(): string{
    return this.usersService.getRole()!
  }

}
