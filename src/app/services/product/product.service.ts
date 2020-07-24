import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products=[];
  constructor(private db:AngularFireDatabase,private af: FirebaseApp) {
    this.products=[];

   
    

this.products =[
      {'id':'1','title': 'Banana','price':'3','category':'fruits','imageUrl':'assets/images/Banana.jpg'},
      {'id':'2','title': 'Strawberry','price':'10','category':'fruits','imageUrl':'assets/images/Strawberry.jpg'},
      {'id':'3','title': 'Kiwi','price':'20','category':'fruits','imageUrl':'assets/images/Kiwi.jpg'},
      {'id':'4','title': 'Orange','price':'50','category':'fruits','imageUrl':'assets/images/orange.jpg'},
      {'id':'5','title': 'Grapes','price':'15','category':'fruits','imageUrl':'assets/images/grapes.jpg'},
      {'id':'6','title': 'Mango','price':'60','category':'fruits','imageUrl':'assets/images/Mango.jpg'},
 
      {'id':'7','title': 'Tomato','price':'3','category':'veggies','imageUrl':'assets/images/tomato.jpg'},
      {'id':'8','title': 'Garlic','price':'10','category':'veggies','imageUrl':'assets/images/garlic.jpg'},
      {'id':'9','title': 'Potato','price':'20','category':'veggies','imageUrl':'assets/images/potato.jpg'},
      {'id':'10','title': 'Okra','price':'50','category':'veggies','imageUrl':'assets/images/okra.jpg'},
      {'id':'11','title': 'Bell Peppers','price':'15','category':'veggies','imageUrl':'assets/images/capsicum.jpg'},
      {'id':'12','title': 'Carrots','price':'40','category':'veggies','imageUrl':'assets/images/carrots.jpg'}
 
    ];
   }
   ngOnInit(){
   
  
   }
   update(product,id){
    this.db.object('/products/'+id).update(product);
   }
  create(product){
    this.db.list('/products').push(product);
   /* console.log(product);
 

  var myRef = firebase.database().ref('products').push(product,function(error){
    if (error) {
       console.log('Writing Failed'+error.message+','+error.stack);
    } else {
      console.log('Data saved successfully');
    }

  });

*/

  }
  getAll(){


    return this.products;
  }

  getAllProducts(){
    console.log('In getAllProducts');
    console.log(this.db.list('/products').valueChanges());
    return this.db.list('/products').snapshotChanges();
/*
    console.log('Hello');
    firebase.database().ref('/products').once('value').then(function(snapshot) {
    console.log(snapshot.val());

      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        // ...
      }); 

      return (  this.db.list('/products'));
    
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        return this.products;
      });
     
      //console.log(this.db.list('products'));
      //this.db.doc('products').valueChanges();
    
    */
  }

  getProduct(id)
  { 
    /*var item= this.products.find(item => item.id==id);
    console.log('Item');
    console.log(item);
    return item; */
   /* firebase.database().ref('products/' + id).once('value',function(snapshot){
      console.log(snapshot.val());
      return snapshot.val();
    }
    ); */

    return this.db.object('/products/'+id).valueChanges();
   
    
  }
  search(searchChar:string){
    return this.products.filter(item => { console.log(item.title.toLowerCase()+','+searchChar.toLowerCase()); return ((item.title.toLowerCase()).includes(searchChar.toLowerCase()) || (item.category.toLowerCase()).includes(searchChar.toLowerCase()))});
  }
}
