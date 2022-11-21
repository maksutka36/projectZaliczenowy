import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { host } from "../hostUrl/hostUrl"
import { User } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  
  getPosts( pageSize: number, currentPage: number){
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    this.http.get<{message: string,posts: any, maxPosts: number}>(`${host}/post/get` + queryParams)
    .pipe(
      map(postDate => {
        return {
          posts: postDate.posts.map(
            (post: { 
              _id: string,
              name: string;
              surname: string;
              phone: string;
              carNumber: string;
              brand: string;
              mechanics: Array<string>;
              comment: string;
              problem: string;
              startDate: string;
              endDate: string;
              status: string;
            }) => {
            return {
              id: post._id,
              name: post.name,
              surname: post.surname,
              phone: post.phone,
              carNumber: post.carNumber,
              brand: post.brand,
              mechanics: post.mechanics,
              comment: post.comment,
              problem: post.problem,
              startDate: post.startDate,
              endDate: post.endDate,
              status: post.status,
            };
        }),
        maxPosts: postDate.maxPosts
      }
      })
    )
      .subscribe(transformedPostData =>{
        this.posts = transformedPostData.posts
        this.postsUpdated.next({posts: [...this.posts], postCount: transformedPostData.maxPosts})
      })
  }

  getPostsFixed( pageSize: number, currentPage: number){
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    this.http.get<{message: string,posts: any, maxPosts: number}>(`${host}/post/getFixed` + queryParams)
    .pipe(
      map(postDate => {
        return {
          posts: postDate.posts.map(
            (post: { 
              _id: string,
              name: string;
              surname: string;
              phone: string;
              carNumber: string;
              brand: string;
              mechanics: Array<string>;
              comment: string;
              problem: string;
              startDate: string;
              endDate: string;
              status: string;
            }) => {
            return {
              id: post._id,
              name: post.name,
              surname: post.surname,
              phone: post.phone,
              carNumber: post.carNumber,
              brand: post.brand,
              mechanics: post.mechanics,
              comment: post.comment,
              problem: post.problem,
              startDate: post.startDate,
              endDate: post.endDate,
              status: post.status,
            };
        }),
        maxPosts: postDate.maxPosts
      }
      })
    )
      .subscribe(transformedPostData =>{
        this.posts = transformedPostData.posts
        this.postsUpdated.next({posts: [...this.posts], postCount: transformedPostData.maxPosts})
      })
  }

  getPost(postId: string){
    return this.http.get<Post>(
      `${host}/post/` + postId
    );
  }

  addPost(
    id: string,
    name: string,
    surname: string,
    phone: string,
    carNumber: string,
    brand: string,
    mechanics: Array<User>,
    comment: string,
    problem: string,
    startDate: string,
    endDate: string,
    status: string,
    ){
    const postData: Post = {
      id:  id,
      name:  name,
      surname: surname,
      phone: phone,
      carNumber: carNumber,
      brand: brand,
      mechanics: mechanics,
      comment: comment,
      problem: problem,
      startDate: startDate,
      endDate: endDate,
      status: status,
    };
    console.log(postData)
    this.http.post<{ message: string; post: Post }>(`${host}/post/create`, postData)
      .subscribe( res => {
        this.router.navigate([''])
      })
  }

  updatePost(
    id: string,
    name: string,
    surname: string,
    phone: string,
    carNumber: string,
    brand: string,
    mechanics: Array<User>,
    comment: string,
    problem: string,
    startDate: string,
    endDate: string,
    status: string,
    ){
    let postData: Post | FormData;
    postData = {
      
      id: id,
      name: name,
      surname: surname,
      phone: phone,
      carNumber: carNumber,
      brand: brand,
      mechanics: mechanics,
      comment: comment,
      problem: problem,
      startDate: startDate,
      endDate: endDate,
      status: status,
    }
    this.http.put(`${host}/post/update/` + id, postData).subscribe( res =>{
      this.router.navigate(["/"]);
    })
  }

  deletePost(postId: string){
    return this.http.delete(`${host}/post/` + postId);
  }

}