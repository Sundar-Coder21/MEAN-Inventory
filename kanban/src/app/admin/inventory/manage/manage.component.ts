import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InventoryItem } from '../../../shared/interface/common-interface';
import { InventoryService } from '../inventory.service';
import { UtilityService } from '../../../shared/service/utility-service.service';

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
  inventoryId: any;
  inventoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inventory: InventoryService,
    private utility: UtilityService
  ) {
    this.inventoryForm = this.fb.group({
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
      this.loadInventoryItem(this.id);
    }
  }

  loadInventoryItem(id: string): void {
    this.inventory.getInventoryItemById(id).subscribe(
      (item: InventoryItem) => {
        this.inventoryId = item.id;
        this.inventoryForm.patchValue(item);
      },

    );
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const formData = this.inventoryForm.value;
      if (this.inventoryId) {
        // Update existing item if inventoryId is set
        this.inventory.updateInventoryItem(this.inventoryId, formData).subscribe(
          () => {
            console.log('Inventory item updated successfully');
            this.utility.success("update successfully")
            this.router.navigateByUrl("/admin/inventory")
          },

        );
      } else {
        this.inventory.createInventoryItem(formData).subscribe(
          () => {
            console.log('Inventory item created successfully');
            this.utility.success("created successfully")
            this.router.navigateByUrl("/admin/inventory")

          },
        );
      }
    } else {
      this.inventoryForm.markAllAsTouched();
    }
  }
}
