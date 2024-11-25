import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8080/api/v1"
  constructor(private httpClient: HttpClient) {
  }

  /**
   * get summary list of employee
   * @returns employeeList
   */
  getEmployeeSummary(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseUrl}/employees`)
  }


  /**
   * save employee details
   * @param employee 
   * @returns 
   */
  saveEmployeeDetails(employee: Employee) {
    return this.httpClient.post(`${this.baseUrl}/saveemployees`, employee)
  }


  /**
   * fetch employee data by id
   * @param employeeId 
   * @returns 
   */
  fetchEmployeeById(employeeId: number) {
    return this.httpClient.get<Employee>(`${this.baseUrl}/employees/${employeeId}`)
  }

  //delete employee by id method
  deleteEmployeeById(employeeId: number) {
    return this.httpClient.delete<Employee>(`${this.baseUrl}/employees/${employeeId}`)
  }
}
