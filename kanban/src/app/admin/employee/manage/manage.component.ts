import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UtilityService } from '../../../shared/service/utility-service.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent {
  @Input() id = ''; // Input property to receive ID from parent component
  EmployeeId: any;
  EmployeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private Employee: EmployeeService,
    private utility: UtilityService
  ) {
    this.EmployeeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      category: [''],
      location: [''],
      supplier: ['']
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.loadEmployeeItem(this.id);
    }
  }

  loadEmployeeItem(id: string): void {
    this.Employee.getEmployeeById(id).subscribe(
      (item: any) => {
        this.EmployeeId = item.id;
        this.EmployeeForm.patchValue(item);
      },

    );
  }

  onSubmit(): void {
    if (this.EmployeeForm.valid) {
      const formData = this.EmployeeForm.value;
      if (this.EmployeeId) {
        // Update existing item if EmployeeId is set
        this.Employee.updateEmployee(this.EmployeeId, formData).subscribe(
          () => {
            console.log('Employee item updated successfully');
            this.utility.success("update successfully")
            this.router.navigateByUrl("/admin/Employee")
          },

        );
      } else {
        this.Employee.createEmployee(formData).subscribe(
          () => {
            console.log('Employee item created successfully');
            this.utility.success("created successfully")
            this.router.navigateByUrl("/admin/Employee")

          },
        );
      }
    } else {
      this.EmployeeForm.markAllAsTouched();
    }
  }
}
