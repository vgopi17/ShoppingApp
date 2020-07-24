import { Component, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import {UserDetailsService} from'../services/user-details.service';
import {Router} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/AuthService/auth.service';
import { ShoppingCartService } from '../services/cartService/shopping-cart.service';
import { of, Subscription } from 'rxjs';
import { ShoppingCart } from '../Model/shopping-cart';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  isClicked: Boolean;
  username :String;
  shoppingCartCount: number;
  cart$;
  cartSub:Subscription;
 
  constructor(private user:UserDetailsService
    ,private router : Router
    ,private auth:AuthService
    ,private shoppingCartSer: ShoppingCartService
    )
     { 
    this.isClicked =false;
    this.user.setUsername(null);
    this.auth.isInvalidLogin=true;
    console.log(this.auth.getInvalidLogin());
   
  }

   async ngOnInit() {
    this.cart$ =await this.shoppingCartSer.getCart();
   
    
    this.cartSub =this.cart$.subscribe((cart:any)=>{
      this.shoppingCartCount=0;
    for(let pID in cart.items )
          {
         //this.shoppingCartCount = this.shoppingCartCount+cart.items[pID].quantity;
           this.shoppingCartCount = this.shoppingCartCount+cart.items[pID].quantity;
    }
  });
    
  }
  onClick(){
    this.isClicked=!this.isClicked;
  }

  login(){
    /*
    firebase.initializeApp(environment.firebase);
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithRedirect(provider).then(function (data){
      
      console.log('Result'+data)
  })
  .catch(function(error){
      console.log(error)
  }) */
  }
  logout(){
    firebase.auth().signOut();
   this.auth.isInvalidLogin=true;
    this.router.navigateByUrl('/');

  }
  myOrders(){
    this.isClicked=false;
    this.router.navigateByUrl("/my-orders");
  }
  orders(){
    this.isClicked=false;
    this.router.navigateByUrl("/admin/orders");
  }
  products(){
    this.isClicked=false;
    this.router.navigateByUrl("/admin/products");
  }
  getName(){
    return this.user.getUsername();
  }

  getLoginInfo(){

    return this.auth.getInvalidLogin();
  }

  getAdminInfo(){

    return this.auth.isAdmin;
  }

  onLose(){
   // alert('Outside Dropdown');
    this.isClicked=!this.isClicked;
    console.log(this.isClicked);
  }

onNgDestroy(){
  if(this.cartSub)
this.cartSub.unsubscribe();
}
}
