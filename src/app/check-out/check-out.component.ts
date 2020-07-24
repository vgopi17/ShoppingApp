import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/cartService/shopping-cart.service';
import { ShoppingCart } from '../Model/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/orderService/order.service';
import { ShoppingCartItem } from '../Model/shopping-cart-item';
import { Router } from '@angular/router';
import { Shipping } from '../Model/shipping';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shipping; 
  cart:ShoppingCart;
  items:ShoppingCartItem[];
  cartSub: Subscription;
  totalPrice:number;
  constructor(private shoppingCartServ: ShoppingCartService
    ,private orderServ:OrderService
    ,private router:Router) {
      this.shipping=[];
     }

  
 
  placeOrder() {
    this.totalPrice=0;
    console.log(this.items);
    let arr = [];
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
    
     

    
    

      items: Object.keys(this.items).map(i=>{
       this.totalPrice = this.totalPrice + Number(this.items[i].product.price)* Number(this.items[i].quantity);
        return{
          product:{
            title:this.items[i].product.title,
            price: this.items[i].product.price,
            imageUrl: this.items[i].product.imageUrl
          },
          quantity: this.items[i].quantity
        }
      }),
       
      
    }
    this.orderServ.saveOrder(order);
    alert('Order Successfully placed');
    this.shoppingCartServ.clearCart();

    console.log('Order successfully placed');
    this.router.navigateByUrl('/products');
  }    

  async ngOnInit() {
    let cart$ =  await this.shoppingCartServ.getCart();
    this.cartSub = cart$.subscribe((cart:ShoppingCart)=> {this.cart=cart;
      this.items= cart.items;});
  
  }
  ngOnDestroy(){
    if(this.cartSub)
    this.cartSub.unsubscribe();
  }

}
