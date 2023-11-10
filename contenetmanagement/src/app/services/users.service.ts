import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getUsersList(searchTerm:string){
    const url = `${environment.apiUrl}/user?searchPattern=${searchTerm}`;
    return this.http.get(url);
  }
}
