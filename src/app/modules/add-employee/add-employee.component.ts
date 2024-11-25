import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../shared/success-popup/success-popup.component';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  employeeId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private employeeSerivce: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.employeeId = +param['id'];
      if (this.employeeId) {
        console.log(this.employeeId);
        this.fetchEmployeeById();
      }
    });
    this.buildEmployeeForm();
  }

  /**
   * bulid form for employeedetails
   */
  buildEmployeeForm(data?: Employee) {
    this.addEmployeeForm = this.fb.group({
      id: [data?.id ?? ''],
      firstname: [data?.firstname ?? '', Validators.required],
      lastname: [data?.lastname ?? '', Validators.required],
      emailId: [
        data?.emailId ?? '',
        [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
      ],
    });
  }

  fetchEmployeeById() {
    if (this.employeeId) {
      this.employeeSerivce
        .fetchEmployeeById(this.employeeId)
        .subscribe((res) => {
          if (res) {
            this.buildEmployeeForm(res);
          }
        });
    }
  }

  /**
   * submit method
   */
  submitEmployee() {
    if (!this.addEmployeeForm.valid) {
      this.addEmployeeForm.markAllAsTouched();
      return;
    }
    let payload = {
      ...this.addEmployeeForm.value,
    };

    const message = payload?.id ? 'Employee Updated Successfully' : 'Employee Saved Successfully'
    this.employeeSerivce.saveEmployeeDetails(payload).subscribe((res) => {
      if (res) {
        const dialogRe = this.dialog.open(SuccessPopupComponent, {
          width: '300px',
          data: { message: message },
        });
        dialogRe.afterClosed().subscribe(() => {
          this.router.navigate([`/employeeSummary`]);
        })
      }
    });
  }
}
