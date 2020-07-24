import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { ProductService } from 'src/app/services/product/product.service';
import {ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import {  AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import  'rxjs/add/operator/take';
import { product } from '../admin-products/admin-products.component';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories;
  product;
  constructor(private catService: CategoriesService
    ,private prodService: ProductService
    ,private route :  ActivatedRoute
    ,private router : Router
    ,private afDb : AngularFireDatabase) { 

      this.product=[];
    this.categories = this.catService.getCategories();
   

    
    
  }

 async  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      /*
      this.prodService.getProduct(id).subscribe(res =>
        this.product = res); */
        let product$ = await this.prodService.getProduct(id);
        product$.subscribe(prod=>
          this.product=prod);
      console.log(this.product);
      
        
    }
  

 
  }

  save(newProd){

    let id = this.route.snapshot.paramMap.get('id');
    if(id)
    {
     this.prodService.update(newProd,id);
     alert('Product updated successfully!');
    }
    else
    {
       this.prodService.create(newProd);
  alert('Product saved successfully!');
    }
  this.router.navigateByUrl('/admin/products');

  }

}
