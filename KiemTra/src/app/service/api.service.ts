import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Employee } from '../model/Employee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private REST_API_SERVER_EMPLOYEES = 'http://localhost:3000/employees'; //api dbjson
  constructor(private httpClient: HttpClient) {}

  //getEmployees
  public getEmployees() {
    const url = this.REST_API_SERVER_EMPLOYEES;
    return this.httpClient
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //postEmployees
  public addEmployee(employeeData: any) {
    const url = this.REST_API_SERVER_EMPLOYEES;
    return this.httpClient
      .post<any>(url, employeeData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //getbyID
  public getEmployeeById(id: number) {
    const url = `${this.REST_API_SERVER_EMPLOYEES}/${id}`;
    console.log(url);
    return this.httpClient
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //putEmployee
  public updateEmployee(id: string, employeeData: Employee) {
    const url = `${this.REST_API_SERVER_EMPLOYEES}/${id}`;
    return this.httpClient
      .put<any>(url, employeeData, httpOptions)
      .pipe(catchError(this.handleError));
  }
  //delete
  deleteEmployeeById(id: number) {
    const url = `${this.REST_API_SERVER_EMPLOYEES}/${id}`;
    return this.httpClient.delete<void>(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    } else {
    }
    console.error(
      'Backend returned code ${error.status},' + `body was: ${error.error}`
    );
    return throwError('Something bad happened; please try again later. ');
  }
}
