import { Component, ViewChild, inject } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, } from '@angular/router';
import { InventoryItem } from '../../../shared/interface/common-interface';
import { UtilityService } from '../../../shared/service/utility-service.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TitleCasePipe, MatCardModule, MatButtonModule, MatIconModule, RouterLink, CurrencyPipe,
    MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'description', 'quantity', 'unitPrice', 'actions'];
  dataSource!: MatTableDataSource<any[]>;
  // inventoryItems: InventoryItem[] = [
  //   { id: 1, name: 'Product A', description: 'Description of Product A', quantity: 10, unitPrice: 19.99 },
  //   { id: 2, name: 'Product B', description: 'Description of Product B', quantity: 5, unitPrice: 29.99 },
  //   // Add more items as needed
  // ];

  constructor(
    private router: Router,
    private utility: UtilityService,
    private inventory: InventoryService

  ) {
    // this.dataSource = new MatTableDataSource(this.inventoryItems);
  }

  ngOnInit() {
    this.loadInventoryItems()
  }


  loadInventoryItems() {
    this.inventory.getInventoryItems().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteItem(item: { id: string }): void {
    this.inventory.deleteInventoryItem(item.id).subscribe(
      (res) => {
        this.utility.success("deleted successfully");
        this.loadInventoryItems();
      }
    );
  }

  editItem(item: { id: number }) {
    this.router.navigate(['/admin', 'inventory', 'manage', item.id]);
  }

  download() {
    this.utility.exportexcel('excel-table', 'inventory.xlsx')
  }



}
