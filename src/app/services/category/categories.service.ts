import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories:Object;
  constructor(private db:AngularFireDatabase) { 
    this.categories=[
      {'key':'bread',  'name':'Breads'},
      {'key':'dairy','name':'Dairy'},
      {'key':'veggies', 'name':'Vegetables'},
      {'key':'fruits','name':'Fruits'},
      {'key':'seasonings', 'name':'Seasonings & Spices'}
    ];
  }
  getCategories(){
    //return this.categories;
    return this.db.list('/categories').snapshotChanges();
  }
}
