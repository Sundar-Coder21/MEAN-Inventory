import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LocalStorageService } from './../shared/service/localstoreage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  constructor(private http: HttpClient,
    private store:LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  login(login: object) {
    return this.http.post(`${this.baseUrl}user/login`, login);
  }

  logout(){
    this.store.clearStorage()
  }
}
