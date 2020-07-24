import { ShoppingCartItem } from './shopping-cart-item';
import { product } from '../models/product';

export class ShoppingCart{
   // private items: ShoppingCartItem[]=[];
    product:product;
    constructor(public items: ShoppingCartItem[]){
       /* for(let p in itemsMap){
        this.items.push(itemsMap[p]);
        }*/
        //console.log(Object.keys(this.items));
    }
   get productIDs(){
        console.log('ProductID');
        return  Object.keys(this.items);
    }
    
    get totalItemsCount(){

     let shoppingCartCount=0;
      for(let pID in this.items )
      {
        shoppingCartCount = shoppingCartCount+ this.items[pID].quantity;
      }
    return shoppingCartCount;
    }
}