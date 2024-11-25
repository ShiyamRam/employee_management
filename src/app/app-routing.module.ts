import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeSummaryComponent } from './modules/employee-summary/employee-summary.component';
import { AddEmployeeComponent } from './modules/add-employee/add-employee.component';

const routes: Routes = [
  { path: 'employeeSummary', component: EmployeeSummaryComponent },
  { path: '', redirectTo: "employeeSummary", pathMatch: 'full' },
  { path: 'add-employee', component: AddEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
