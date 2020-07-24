import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { AngularFireModule} from 'angularfire2';
//import { AngularFireDatabase} from 'angularfire2/database';
//import { AngularFireAuthModule} from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
//import firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {APP_BASE_HREF} from '@angular/common';
import {auth} from 'firebase/app';
import 'firebase/firestore';
//import * as firebase from 'firebase';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/AuthService/auth.service';
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { AdminGuardService } from './services/adminAuthGuard/admin-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoriesService } from './services/category/categories.service';
import { ProductService } from './services/product/product.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ShoppingCartService } from './services/cartService/shopping-cart.service';
import { OrderService } from './services/orderService/order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
//import { DataTableModule } from 'angular7-data-table';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
   
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    //AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule,
   AngularFireDatabaseModule
    
    
  ],
  providers:  [{provide: APP_BASE_HREF, useValue : '/' },AuthService,OrderService
  ,AuthGuardService,AdminGuardService,CategoriesService,ProductService,ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
