import { Injectable } from '@angular/core';
import {  of } from 'rxjs';
import {Observable} from 'rxjs'
import { UserDetailsService } from '../user-details.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isInvalidLogin:Boolean;
  isAdmin :Boolean;
  constructor(private userDetails: UserDetailsService) { }

  login(credentials){
    console.log(credentials.email);

    if(credentials.email=='Vaishnavi' && credentials.password=='Deloitte#123'){
    this.isInvalidLogin=false;
    this.userDetails.username=credentials.email;
    this.isAdmin=true;
    return of(true);
    }
    else if (credentials.email=='Ajai' && credentials.password=='Deloitte#123'){
      
      this.isInvalidLogin=false;
      this.isAdmin=false;
      this.userDetails.username=credentials.email;
    return of(true);
    }
    else
    {
      this.isInvalidLogin=true;
      this.isAdmin=false;
      this.userDetails.username=credentials.email;
      return of(false);
    }
  }
  getInvalidLogin(){
    return this.isInvalidLogin;
  }
}
