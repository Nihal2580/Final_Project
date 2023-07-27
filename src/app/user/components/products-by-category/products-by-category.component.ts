import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../../user-services/user.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit {

  products: any = [];
  categoryId: any = this.activatedroute.snapshot.params['categoryId'];
  validateForm!: FormGroup;
  isSpinning = false;
  size: NzButtonSize = 'large';

  constructor(private userService: UserService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getProductByCategoryId();
  }

  getProductByCategoryId() {
    this.isSpinning = true;
    this.userService.getProductByCategoryId(this.categoryId).subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
        this.isSpinning = false;
      });
    });
  }

  addToCart(productId: any) {
    this.userService.addToCart(productId).subscribe((res) => {
      this.notification
        .success(
          'SUCCESS',
          `Product Added to Cart Successfully!`,
          { nzDuration: 5000 }
        );
    });
  }
}
