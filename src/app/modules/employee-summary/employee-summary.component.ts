import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { SuccessPopupComponent } from '../shared/success-popup/success-popup.component';

@Component({
  selector: 'app-employee-summary',
  templateUrl: './employee-summary.component.html',
  styleUrls: ['./employee-summary.component.css'],
})
export class EmployeeSummaryComponent implements OnInit {
  employeeList!: Employee[];
  constructor(
    private employeeService: EmployeeService,
    private route: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.fetchSummary();
  }

  /**
   * fetch all summary data
   */
  fetchSummary() {
    this.employeeService.getEmployeeSummary().subscribe((res: Employee[]) => {
      console.log(res, 'responseee');
      this.employeeList = res;
    });
  }

  updateEmployee(id: number | undefined) {
    if (id) this.route.navigate(['add-employee'], { queryParams: { id } });
  }

  deleteEmployee(id: number | undefined) {
    if (id) {
      this.employeeService.deleteEmployeeById(id).subscribe((res) => {
        console.log(res, 'response delete');
        if (res.deleted) {
          const dialogRe = this.dialog.open(SuccessPopupComponent, {
            width: '300px',
            data: { message: 'Employee deleted successfully!' },
          });
          dialogRe.afterClosed().subscribe(() => {
            this.fetchSummary()
            this.cdr.detectChanges()
          });
        }
      });
    }
  }
}
