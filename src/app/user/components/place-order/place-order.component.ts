import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../../user-services/user.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  Payment = ["Cash", "Card"];
  validateForm!: FormGroup;
  isSpinning = false;
  size: NzButtonSize = 'large';

  constructor(private userService: UserService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null, [Validators.required]],
      payment: [null, [Validators.required]],
    });
  }

  placeOrder() {
    this.isSpinning = true;
    this.userService.placeOrder(this.validateForm.value).subscribe((res) => {
      this.notification
        .success(
          'SUCCESS',
          `Order placed successfully!`,
          { nzDuration: 5000 }
        );
      this.isSpinning = false
      this.router.navigateByUrl("/user/my-orders")
    });
  }

}
