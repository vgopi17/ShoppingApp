import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/cartService/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../Model/shopping-cart';
import { ShoppingCartItem } from '../Model/shopping-cart-item';
import { ItemsObject } from '../Model/items-obj';


@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit,OnDestroy {
  cart$;
  shoppingCartCount : number;
  item$: ItemsObject[];
  cartSub :Subscription;
  totalPrice:number;
  constructor(private shoppingCartServ: ShoppingCartService) {
    
   }
   clearCart()
   {
     this.shoppingCartServ.clearCart();

   }
   addToCart(product,pID)
   {
    
    this.shoppingCartServ.addToCart(product,pID);
   }

  removeFromCart(product,pID:string){
    
    this.shoppingCartServ.removeFromCart(product,pID);
    /*console.log(this.item$);
    this.item$ = this.item$.map(element => {
     if (pID=> pID==element.product)
       element.price =element.price+1;
      return element;
    });  
    console.log(this.item$); */
  }

   
   async ngOnInit() {
     this.item$=[];
    this.cart$ =this.shoppingCartServ.getCart();
    console.log(this.cart$);
    let cart$ = await this.shoppingCartServ.getCart();
    
    this.cartSub =cart$.subscribe((cart:any)=>{
      this.item$=[];
      this.shoppingCartCount=0;
       this.totalPrice=0;
      //this.item$= Object.keys(cart.items);
      //console.log(this.item$);
      for(let pID in cart.items )
      {
        //console.log(cart.items[pID].product.title);
        this.item$.push({'product':cart.items[pID].product.title
        ,'quantity':Number(cart.items[pID].quantity)
      , 'price':cart.items[pID].product.price
    ,'key':pID
  ,'imageUrl':cart.items[pID].product.imageUrl});
      this.totalPrice+=cart.items[pID].product.price*cart.items[pID].quantity;
        this.shoppingCartCount = this.shoppingCartCount+cart.items[pID].quantity;
      }
    }); 
   
  }

 ngOnDestroy(){
  if(this.cartSub)
   this.cartSub.unsubscribe();
 }
}
