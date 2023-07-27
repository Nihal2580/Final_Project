import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { UserService } from '../../user-services/user.service';

@Component({
  selector: 'app-user-dashborad',
  templateUrl: './user-dashborad.component.html',
  styleUrls: ['./user-dashborad.component.scss']
})
export class UserDashboradComponent implements OnInit {

  categories: any = [];
  validateForm!: FormGroup;
  isSpinning = false;
  size: NzButtonSize = 'large';

  constructor(private userService: UserService,
    private notification: NzNotificationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getAllCategories();
    this.getAllUsers();
  }

  submitForm() {
    this.isSpinning = true;
    this.userService.getCategoriesByTitle(this.validateForm.get(['title'])!.value).subscribe((res) => {
      this.categories = res;
      console.log(res);
      this.isSpinning = false;
    });
  }

  getAllCategories() {
    this.isSpinning = true;
    this.userService.getAllCategories().subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
    });
  }

  getAllUsers() {
    this.isSpinning = true;
    this.userService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
    });
  }

}
