import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'src/app/services/category/categories.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  Categories$;
  @Input('category') category:string;
  constructor( private categorySer: CategoriesService) { 
    this.Categories$ = categorySer.getCategories();
    console.log(this.Categories$);
  }

  ngOnInit() {
  }

}
