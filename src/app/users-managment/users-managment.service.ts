import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { host } from "../hostUrl/hostUrl"

@Injectable({
  providedIn: 'root'
})
export class UsersManagmentService {

  constructor(
    private http: HttpClient
  ) { }

  getMechanics(){
    return this.http.get(`${host}/users/getMechanics`)
  }

  getRole(){
    return localStorage.getItem("role")
  }

  setPage(page: string){
    localStorage.setItem('page', page)
  }

  getPage(){
  return  localStorage.getItem('page')
  }
}
