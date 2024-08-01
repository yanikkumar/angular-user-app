import { Component } from '@angular/core';
import { UserModel } from '../../Model/user';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
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

  cityList: string[] = ['Chandigarh', 'Delhi', 'Mohali', 'Gurgaon'];
  departmentList: string[] = ['IT', 'HR', 'Accounts', 'Sales', 'Management'];

  onSubmit(form: NgForm): void {}
  onEdit() {}
  onDelete() {}
  onResetForm() {}
}
