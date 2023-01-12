import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }


  // get current user details who is logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
    
  }



  // generate token
  public generateToken(loginData: any){ 
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }


  //login user : store token in local storage
  public loginUser(token : string) {

    localStorage.setItem("token", token);
    return true;
  }

  // check if user is logged in or not
  public isLoggedIn() {
    let t = localStorage.getItem("token");
    if(t == undefined || t == null || t == '') {
      return false;
    }
    return true;
  }

  // logout user
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // get token
  public getToken() {
    let t = localStorage.getItem("token");
    return t;
  }

  // set user
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // get user
  public getUser() {
    let userStr = localStorage.getItem("user");
    if(userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
