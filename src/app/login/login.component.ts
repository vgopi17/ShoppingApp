import { Component } from '@angular/core';
import * as firebase from 'firebase';
import  { BsNavbarComponent } from '../bs-navbar/bs-navbar.component';
import {Output,EventEmitter} from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
import {Router} from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Subscribable, Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  
  @Output() userNameNotify: EventEmitter<any>= new EventEmitter();
  authSub: Subscription;

  constructor(private afauth: AngularFireAuthModule, private Username:UserDetailsService,private router:Router,private authService :AuthService) { 
  }

  login(formData){
    
    firebase.auth().signInAnonymously().catch(function(error) {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
     
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log(isAnonymous+','+uid);
      } else {
        console.log('else');
      }
      
    });


    this.authSub = this.authService.login(formData).subscribe(result=>{
      if(result)
      {
      this.router.navigateByUrl('/products');
   
      console.log('Inside if');
      }
      else
      {
     console.log(this.authService.getInvalidLogin());
      console.log('Inside else');
      }

    })
  
    console.log(this.Username.getUsername());
 
  }
  getValidity(){
    return this.authService.isInvalidLogin;
  }
  ngOnDestroy(){
    if(this.authSub)
    this.authSub.unsubscribe();
  }
  

}
