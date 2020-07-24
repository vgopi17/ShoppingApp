import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import {  ActivatedRoute } from '@angular/router';
import { product } from '../admin/admin-products/admin-products.component';
import { ShoppingCartService } from '../services/cartService/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  Products$=[];
  filteredProducts:product[]=[];
  shoppingCart:any;
  category:string;
  routeSub: Subscription;
  prodSub: Subscription;
  cartSub: Subscription;
  constructor(private prodserv:ProductService
              ,private route:ActivatedRoute
              ,private shoppingCartserv : ShoppingCartService) { 

     
     this.prodSub = prodserv.getAllProducts().subscribe(p=>{
       this.Products$ =p;

      this.routeSub =  route.queryParamMap.subscribe(params=>{
        this.category= params.get('category');
       console.log('Category'+this.category);
       this.filteredProducts = (this.category)? this.Products$.filter(p=>{ 
        console.log(p.payload.val().category+','+this.category);
        return  p.payload.val().category==this.category; }):this.Products$;

     });
     
      });
  
    console.log(this.Products$);

  
    

  }

 async  ngOnInit() {
    //this.shoppingCart = await this.shoppingCartserv.getCart();
    this.cartSub =  ( await this.shoppingCartserv.getCart()).subscribe(cart=>
     this.shoppingCart=cart );
    ;
  }
 
  ngOnDestroy(){
    if(this.prodSub)
    this.prodSub.unsubscribe();

    if(this.routeSub)
    this.routeSub.unsubscribe();
    
    if(this.cartSub)
    this.cartSub.unsubscribe();
  }

}
