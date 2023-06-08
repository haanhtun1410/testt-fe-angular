import { Component } from '@angular/core';
import { Employee } from '../model/Employee';
import { FormBuilder, FormGroup,Validators, AbstractControl   } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  listEmp: Employee[] = [];
  selectedEmployees: Employee [] = [];
  employeeForm: FormGroup;
  selectedFile: File | undefined;
  constructor(
    private ApiService : ApiService,
    private formBuilder: FormBuilder
  ) {

    //build the form
    this.employeeForm = this.formBuilder.group({
      id: ['',[Validators.required]],
      name: ['',[Validators.required]],
      age: ['', [Validators.required, this.ageRangeValidator]],
      address: ['',[Validators.required]],
      sex: ['',[Validators.required]],
      image: ['',[Validators.required]],
    });
  }

  ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const age = control.value;
  if (age < 18 || age > 60) {
    return { 'ageRange': true };
  }
  return null;
}

  toggleEmployeeSelection(employee: Employee) {
    if (this.isEmployeeSelected(employee)) {
      this.selectedEmployees = this.selectedEmployees.filter(e => e !== employee);
    } else {
      this.selectedEmployees.push(employee);
    }
  }

  isEmployeeSelected(employee: Employee): boolean {
    return this.selectedEmployees.includes(employee);
  }

  //get data from api to display on init section
  ngOnInit() {
    this.ApiService.getEmployees().subscribe((data) => {
      console.log(data);
      this.listEmp = data;
    });
  }
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; 
    this.employeeForm.value.image = this.selectedFile?.name;
     console.log(this.selectedFile?.name);
    // Retrieve the selected file
  }
  //handle add employee while onSubmit
  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm);
      this.employeeForm.value.image = this.selectedFile?.name;
      this.ApiService.addEmployee(this.employeeForm.value).subscribe(  
        (response) => {
          this.listEmp.push(response);
          this.employeeForm.reset();  //reset the form
        },
        (error) => {
          console.error('Error adding employee:', error);
          alert("ID đã tồn tại")
        }
      );
    }
  }
  //get employee
  getDetail(id: number) {
    this.ApiService.getEmployeeById(id).subscribe(
      (employee) => {
        //fill data getted emp to form
        this.employeeForm.setValue(employee);
      }
    );
  }

///delete employee
deleteEmployee(id: number) {
  if (confirm("Xác nhận xoá nhân viên này ?")) {
    this.ApiService.deleteEmployeeById(id).subscribe(
      () => {
        this.listEmp = this.listEmp.filter((employee) => employee.id !== id);
      }
    );
  }
}
//multi delete employee
multiDeleteEmployee() {
  if(this.selectedEmployees.length < 1){
    alert("list selected employee is empty")
    return ;
  }
  if (confirm("Xác nhận xoá các nhân viên này ?")) {
    for (const employee of this.selectedEmployees) {
      this.ApiService.deleteEmployeeById(employee.id).subscribe(
        () => {
          this.listEmp = this.listEmp.filter((e) => e.id !== employee.id);
        }
      );
    }
  }
}

//update employee
  updateEmp(id: string) {
    this.employeeForm.value.image = this.selectedFile?.name; 
    this.ApiService.updateEmployee(id, this.employeeForm.value).subscribe(
      (response) => {
        //update data
        this.ApiService.getEmployees().subscribe((data) => {
          this.listEmp = data;
        });
        //reset form
        this.employeeForm.reset();
      },
      (error) => {
        if (confirm("không có nhân viên này bạn có muốn thêm mới ?")) {
          this.onSubmit();
        } else {
          this.employeeForm.reset();
        }
      }
    );
  }
  
}
