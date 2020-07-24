import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  username:String;
  constructor() { }
  getUsername(){
    return this.username;
  }
  setUsername(user){
    this.username=user;
  }
}
