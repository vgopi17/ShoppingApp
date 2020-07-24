import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Observable } from 'rxjs';
//import {DataTableResource} from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit {
  products;
  products$={};
  

 // tableResource: DataTableResource<product>;
  constructor(private productSer: ProductService) { 
//this.products =  this.productSer.getAll();
console.log('Data from API');
//console.log(this.productSer.getAllProducts());

this.products$ = this.productSer.getAllProducts();
console.log('DAta');
console.log(this.products$ );

console.log('After Data from API');
//console.log(this.products$);
 
  }
/*private initializeTable(products)
{

  this.tableResource = new DataTableResource(products);
  this.tableResource.query({ offset: 0}).then(items => this.items=items);
  this.tableResource.count().then(count=>this.itemCount=count);

}

reloadItems(params){
  if(!this.tableResource) return;
  this.tableResource.query(params).then(items => this.items=items);
}*/
  ngOnInit() {

   
  }
  
  filter(searchChar:string){
     this.products =this.productSer.search(searchChar);
     console.log(searchChar);
  }

}
export interface product{
  title :string;
  price:number;
  category:string;
  id:number;
  imageUrl:string;
}