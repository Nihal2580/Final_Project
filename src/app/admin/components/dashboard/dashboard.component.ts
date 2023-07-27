import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: any = [];
  validateForm!: FormGroup;
  blogs: any;
  searchBlogByTitle: any;
  isSpinning = false;
  size: NzButtonSize = 'large';

  constructor(private adminService: AdminService,
    private notification: NzNotificationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getAllProducts();
  }

  submitForm() {
    this.isSpinning = true;
    this.products = [];
    this.adminService.getProductsByTitle(this.validateForm.get(['title'])!.value).subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
        this.isSpinning = false;
      });
    });
  }

  getAllProducts() {
    this.isSpinning = true;
    this.products = [];
    this.adminService.getAllProducts().subscribe((res) => {
      console.log(res)
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
        this.isSpinning = false;
      });
    });
  }


  deleteProduct(productId: any) {
    this.adminService.deleteProductById(productId).subscribe((res) => {
      if (res.body == null) {
        this.notification
          .success(
            'SUCCESS',
            `Product Deleted Successfully!`,
            { nzDuration: 5000 }
          );
        this.getAllProducts();
      } else {
        this.notification
          .error(
            'ERROR',
            `${res.message}`,
            { nzDuration: 5000 }
          )
      }
    });
  }

}
