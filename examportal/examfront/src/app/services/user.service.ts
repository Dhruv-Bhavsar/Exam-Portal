import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private snack: MatSnackBar) { }


  public addUser(user:any) {
    this.http.post(`${baseUrl}/user/`, user).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire("Successfully done!!", "User id is " + data.id, 'success');
      },
      (error:any)=>{
        console.log(error);
        this.snack.open("Something went wrong !!", '', {
          duration: 3000,
        });
        
      }
    );;
  }
}
