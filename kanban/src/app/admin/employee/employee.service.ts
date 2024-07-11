import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl; // Ensure environment.ts has baseUrl defined
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/employees`);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/employees/${id}`);
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/employees`, employeeData);
  }

  updateEmployee(id: string, employeeData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/employees/${id}`, employeeData);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/employees/${id}`);
  }
}
