import { Component, OnInit, Input } from '@angular/core';
import { product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/cartService/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product : product;
  @Input('widthProp') widthProp : number;
  @Input('productID') productID : string;
  @Input('showActions') showActions : Boolean;
  @Input('shoppingCart') shoppingCart;
  constructor(private shoppingCartServ: ShoppingCartService) { }

  
  ngOnInit() {
    console.log(this.showActions);
  }
 
  addToCart(product){
    
    this.shoppingCartServ.addToCart(product,this.productID);
  }

  removeFromCart(product){
    
    this.shoppingCartServ.removeFromCart(product,this.productID);
  }

   getQuantity()
  {
    if(!this.shoppingCart) return 0;
    
    //console.log(this.shoppingCart.items);
    if(this.shoppingCart.items){
    let item = this.shoppingCart.items[this.productID];
    return item? item.quantity:0;
    }
    /*if (this.shoppingCart.items){
    console.log(this.shoppingCart.items);
    return this.shoppingCart.items[this.productID].quantity;
    }
    else
    return 0; */
  }

}
