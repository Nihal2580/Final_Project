import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboradComponent } from './components/user-dashborad/user-dashborad.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';


@NgModule({
  declarations: [
    UserComponent,
    UserProfileComponent,
    UserDashboradComponent,
    MyOrdersComponent,
    CartComponent,
    PlaceOrderComponent,
    ProductsByCategoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
