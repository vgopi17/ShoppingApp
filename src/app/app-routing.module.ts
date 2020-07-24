import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { AdminGuardService } from './services/adminAuthGuard/admin-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CheckOutComponent } from './check-out/check-out.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: ProductsComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'shopping-cart', component: ShoppingCartComponent},
    {path: 'check-out', component: CheckOutComponent},
    {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
    {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {
      path: "admin/products/new"
    , component: ProductFormComponent
    //, canActivate:[AdminGuardService]
  },
  {
    path: "admin/products/:id"
  , component: ProductFormComponent
  //, canActivate:[AdminGuardService]
},
    {path: 'admin/products', component: AdminProductsComponent
    //,canActivate: [AuthGuardService,AdminGuardService]
  },
    {path: 'admin/orders', component: AdminOrdersComponent,canActivate: [AuthGuardService,AdminGuardService]}

  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
