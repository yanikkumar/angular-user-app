import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../Model/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  usersList: UserModel[] = [];
  editMode: boolean = false;
  user: UserModel = {
    department: '',
    name: '',
    mobile: '',
    email: '',
    gender: '',
    doj: '',
    city: '',
    salary: 0,
    address: '',
    status: false,
  };

  constructor(
    private _userService: UserService,
    private _toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUsersList();
  }
  cityList: string[] = ['Chandigarh', 'Delhi', 'Mohali', 'Gurgaon'];
  departmentList: string[] = ['IT', 'HR', 'Accounts', 'Sales', 'Management'];

  getUsersList() {
    this._userService.getUsers().subscribe((res) => {
      this.usersList = res;
    });
  }

  onSubmit(form: NgForm): void {
    debugger;
    if (this.editMode) {
      console.log(form);
      this._userService.updateUser(this.user).subscribe((res) => {
        this.getUsersList();
        this.editMode = false;
        form.reset();
        this._toastrService.success('User Updated Successfully', 'Success');
      });
    } else {
      console.log(form);
      this._userService.addUser(this.user).subscribe((res) => {
        this.getUsersList();
        form.reset();
        this._toastrService.success('User Created Successfully', 'Success');
      });
    }
  }
  onEdit(userData: UserModel) {
    this.editMode = true;
    this.user = userData;
  }
  onDelete(id: any) {
    const isConfirm = confirm("Are you sure? This can't be undone!");

    if (isConfirm) {
      this._userService.deleteUser(id).subscribe((res) => {
        this._toastrService.error('User Deleted Successfully', 'Deleted');
        this.getUsersList();
      });
    }
  }
  onResetForm(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.getUsersList();
  }
}
