// inventory.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getInventoryItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}inventory/inventorylist`);
  }

  getInventoryItemById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}inventory/inventorylist/${id}`);
  }

  createInventoryItem(itemData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}inventory/newinventory`, itemData);
  }

  updateInventoryItem(id: string, itemData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}inventory/inventory/${id}`, itemData);
  }

  deleteInventoryItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}inventory/inventory/${id}`);
  }
}
