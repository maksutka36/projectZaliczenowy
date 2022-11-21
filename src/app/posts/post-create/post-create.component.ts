import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { Subscription, map, async } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/authorization.service';
import { MatDialog } from '@angular/material/dialog';
import { MechanicsComponent } from './mechanics/mechanics.component';
import { UsersManagmentService } from 'src/app/users-managment/users-managment.service';
import { User } from '../users.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {

  postForm!: FormGroup;
  enteredTitle = "";
  enteredContent = "";
  post?: Post;
  imagePreview!: string;
  isLoading = false;
  mechanics: any;
  addedMechanics: User[] = []
  endDate: any;
  private authStatusSub!: Subscription;
  private mode = "create";
  private postId: any

  constructor(
    public dialog: MatDialog,
    private postService: PostsService,
    private authService: AuthorizationService,
    private usersService: UsersManagmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    })

    this.usersService.getMechanics().subscribe(result =>{this.mechanics = result, console.log(result)})

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId") ;
        this.isLoading = true;
        this.postService.getPost(this.postId)
          .subscribe((post) => {
            console.log(post)
            this.isLoading = false;
            this.post = {
              id: post.id,
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
            this.postForm.setValue({
              name: this.post?.name,
              surname: this.post?.surname,
              phone: this.post?.phone,
              carNumber: this.post?.carNumber,
              brand: this.post?.brand,
              comment: this.post?.comment,
              problem: this.post?.problem,
              startDate: new Date(this.post?.startDate),
              endDate: new Date(this.post?.endDate),
              status: this.post?.status,
            })
            this.addedMechanics = this.post.mechanics
            this.usersService.getMechanics().subscribe(result =>{this.mechanics = result 
              for(let mechanic of this.addedMechanics){
                console.log(this.mechanics)
                this.mechanics.splice(this.mechanics.findIndex((v: { username: string; }) => v.username === mechanic.username), 1)
              }})

              if((new Date(this.postForm.value.endDate) < new Date(this.postForm.value.startDate) || this.postForm.controls.endDate.value == 'Invalid Date')){
                this.postForm.setValue({
                  name: this.post?.name,
                  surname: this.post?.surname,
                  phone: this.post?.phone,
                  carNumber: this.post?.carNumber,
                  brand: this.post?.brand,
                  comment: this.post?.comment,
                  problem: this.post?.problem,
                  startDate: new Date(this.post?.startDate),
                  endDate: null,
                  status: this.post?.status,
                })
              }
        });
      } else {
        this.mode = "create";
        this.postId =  null as any;
      }
    });
    
    this.postForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      surname: new FormControl("", Validators.required),
      phone: new FormControl("",[ Validators.required]),
      carNumber: new FormControl("",[ Validators.required]),
      brand: new FormControl("",[ Validators.required]),
      comment: new FormControl(""),
      problem: new FormControl("",[ Validators.required]),
      startDate: new FormControl("",[ Validators.required]),
      endDate: new FormControl(""),
      status: new FormControl("Ogląd",),
    });


    
    if(this.role != 'ADMIN'){
      this.postForm.controls.name.disable();
      this.postForm.controls.surname.disable();
      this.postForm.controls.phone.disable();
      this.postForm.controls.carNumber.disable();
      this.postForm.controls.brand.disable();
    }
  }


  onAddPost() {
    console.log(this.endDate)
    console.log(this.addedMechanics)
    console.log(this.postForm)
    if (this.mode === "create") {
      console.log(this.postForm)
      if(!this.postForm.invalid){
        if(this.postForm.value.endDate){
          this.postService.addPost(
            this.postId,
            this.postForm.value.name,
            this.postForm.value.surname,
            this.postForm.value.phone,
            this.postForm.value.carNumber,
            this.postForm.value.brand,
            this.addedMechanics,
            this.postForm.value.comment,
            this.postForm.value.problem,
            this.postForm.value.startDate.toISOString(),
            this.postForm.value.endDate.toISOString(),
            this.postForm.value.status,
            );
        }else{
          this.postService.addPost(
            this.postId,
            this.postForm.value.name,
            this.postForm.value.surname,
            this.postForm.value.phone,
            this.postForm.value.carNumber,
            this.postForm.value.brand,
            this.addedMechanics,
            this.postForm.value.comment,
            this.postForm.value.problem,
            this.postForm.value.startDate.toISOString(),
            this.postForm.value.endDate,
            this.postForm.value.status,
            );

        }
    }
    } else {
      if(this.postForm.value.endDate){
        this.postService.updatePost(
          this.postId,
          this.postForm.value.name,
          this.postForm.value.surname,
          this.postForm.value.phone,
          this.postForm.value.carNumber,
          this.postForm.value.brand,
          this.addedMechanics,
          this.postForm.value.comment,
          this.postForm.value.problem,
          this.postForm.value.startDate.toISOString(),
          this.postForm.value.endDate.toISOString(),
          this.postForm.value.status,
          );
      }else{
        this.postService.updatePost(
          this.postId,
          this.postForm.value.name,
          this.postForm.value.surname,
          this.postForm.value.phone,
          this.postForm.value.carNumber,
          this.postForm.value.brand,
          this.addedMechanics,
          this.postForm.value.comment,
          this.postForm.value.problem,
          this.postForm.value.startDate.toISOString(),
          this.postForm.value.endDate,
          this.postForm.value.status,
          );

      }
    }
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe()
  }

  openDialog() {
    const dialogRef = this.dialog.open(MechanicsComponent,
      {data: {allMechanics: this.mechanics, addedMechanics: this.addedMechanics}, 
      width: '80rem', maxHeight: '50rem'}
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addedMechanics = result[0]
        this.mechanics = result[1]
      }
    });
  }

  get role(): string{
    return this.usersService.getRole()!
  }

  page(){
    this.usersService.setPage('Pokaż Zlecenia');
  }

}

