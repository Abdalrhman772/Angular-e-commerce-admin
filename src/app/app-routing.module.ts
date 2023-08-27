import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: 'products', component: AllProductsComponent },
  { path: 'details/:id', component: ProductsDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'cart', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
