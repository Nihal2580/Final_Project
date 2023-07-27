import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../guards/authUser/user.guard';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { UserDashboradComponent } from './components/user-dashborad/user-dashborad.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'dashboard', component: UserDashboradComponent, canActivate: [UserGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [UserGuard] },
  { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [UserGuard] },
  { path: 'place-order', component: PlaceOrderComponent, canActivate: [UserGuard] },
  { path: 'products/:categoryId', component: ProductsByCategoryComponent, canActivate: [UserGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
