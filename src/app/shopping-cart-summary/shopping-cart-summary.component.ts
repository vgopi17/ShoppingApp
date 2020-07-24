import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../Model/shopping-cart';
import { ShoppingCartService } from '../services/cartService/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from '../Model/shopping-cart-item';
import { ItemsObject } from '../Model/items-obj';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

  cartSub:Subscription;
  items:ItemsObject[];
  itemsArray;
  totalPrice:number;
  shoppingCount:number;
  constructor(private shoppingCartServ: ShoppingCartService
    ) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartServ.getCart();
   /* this.cartSub = cart$.subscribe((cart:ShoppingCart)=> {
      this.items= cart.items;});
    this.itemsArray=Object.keys(this.items).map(i=>{
      this.totalPrice = this.totalPrice + Number(this.items[i].product.price)* Number(this.items[i].quantity);
       return{
         product:{
           title:this.items[i].product.title,
           price: this.items[i].product.price,
           imageUrl: this.items[i].product.imageUrl
         },
         quantity: this.items[i].quantity
       }
     });*/


        
    this.cartSub =cart$.subscribe((cart:any)=>{
      this.items=[];
       this.totalPrice=0;
       this.shoppingCount=0;
      for(let pID in cart.items )
      {
        //console.log(cart.items[pID].product.title);
        this.items.push({'product':cart.items[pID].product.title
        ,'quantity':Number(cart.items[pID].quantity)
      , 'price':cart.items[pID].product.price
    ,'key':pID
  ,'imageUrl':cart.items[pID].product.imageUrl});
  this.shoppingCount+=cart.items[pID].quantity
      this.totalPrice+=cart.items[pID].product.price*cart.items[pID].quantity;
      }
    }); 

  }

  ngOnDestroy(){
    if(this.cartSub)
    this.cartSub.unsubscribe();
  }


}
