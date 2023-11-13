import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/Users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getUsersList(pageNumber:number,pageSize:number,searchTerm:string){
    const url = `${environment.apiUrl}/user?searchTerm=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  deleteUser(id:number){
    const url = `${environment.apiUrl}/user?id=${id}`;
    return this.http.delete(url);
  }


  postUser(user:User){
    const url = `${environment.apiUrl}/user`;
    return this.http.post(url,user);
  }

  editUser(user:User){
    const url = `${environment.apiUrl}/user/edit`;
    return this.http.post(url,user);
  }

  
}
