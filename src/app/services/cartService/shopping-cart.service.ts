import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'src/app/Model/shopping-cart';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  subscription : Subscription;
  constructor(private db: AngularFireDatabase) {

    
   }

   create()
   {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
   }

   async clearCart(){
    let cartID = await this.getOrCreateCartID();
    this.db.object('/shopping-carts/'+cartID+'/items').remove();
   }

   async addToCart(product,productID: string){
    let cartID = await this.getOrCreateCartID();
    let item$ = this.db.object('/shopping-carts/'+cartID+'/items/'+productID);
    let subscription = item$.valueChanges().pipe(first()).subscribe((result:any)=>{
      console.log(result);
      if(result) item$.update({quantity:result.quantity+1});
      else
        item$.set({product:product,quantity:1});
    }); 
  }

  async removeFromCart(product,productID: string){
    let cartID = await this.getOrCreateCartID();
    let item$ = this.db.object('/shopping-carts/'+cartID+'/items/'+productID);
    let subscription = item$.valueChanges().pipe(first()).subscribe((result:any)=>{
      console.log(result);
      if(result){ 
        
        item$.update({quantity:result.quantity>1? result.quantity-1:this.db.object('/shopping-carts/'+cartID+'/items/'+productID).remove()});
      }
      else
        item$.set({product:product,quantity:1});
    }); 
  }


  ngOnDestroy() {
    if(this.subscription)
    this.subscription.unsubscribe()
  }

   private async getOrCreateCartID(){
    
    let cartID = localStorage.getItem('cartID');
    if(cartID) return cartID;
    
      let result = await this.create();
      console.log('Key'+result.key);
      localStorage.setItem('cartID',result.key);
      return result.key;
      /* Doing the same job using a PROMISE
      this.create().then(result=> {
        localStorage.setItem('cartID',result.key);
        return this.getCart(result.key);
      }); */
    
       
    

   }
   async getCart(){

    let cartID  = await this.getOrCreateCartID();
    console.log('/shopping-carts/'+cartID);
    return  this.db.object('/shopping-carts/'+cartID).valueChanges();
   }
}
