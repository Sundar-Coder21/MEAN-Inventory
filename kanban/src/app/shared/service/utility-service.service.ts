import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar,
  ) { }

  error(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['app-notification-error'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  success(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['app-notification-success'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  info(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['app-notification-warning'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  exportexcel(tablearr: string,filename:string) {
    try {
      let element = document.getElementById(tablearr);
      let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      let wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      this.error('Error Downloading Export Excel')
    }
  }


}